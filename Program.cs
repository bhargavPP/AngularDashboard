using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using AngularDashboard.Data;
using AngularDashboard.Middleware;
using AngularDashboard.Services;
using AngularDashboard.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ------------ Configuration -------------
builder.Configuration.AddJsonFile("tenants.json", optional: true, reloadOnChange: true);

// ---------- Authentication (JWT/OIDC stub) ----------
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Configure your Authority/Audience/Token validation here
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = false, // set true in prod and set ValidIssuer
            ValidateAudience = false, // set true in prod and set ValidAudience
            ValidateLifetime = true
        };

        // If you use SignalR with JWT in query string:
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = ctx =>
            {
                var accessToken = ctx.Request.Query["access_token"];
                var path = ctx.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs/notifications"))
                {
                    ctx.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

// ------------ Tenant & DB services -------------
builder.Services.AddSingleton<ITenantStore, ConfigurationTenantStore>();
builder.Services.AddScoped<ITenantProvider, HttpContextTenantProvider>();
builder.Services.AddHttpContextAccessor();

// Add a factory to create DbContextOptions per tenant (for DB-per-tenant)
builder.Services.AddScoped<ITenantDbContextFactory, TenantDbContextFactory>();

// Register DbContext for shared-db mode (use connection string from appsettings)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SharedDatabase")));

// SignalR
builder.Services.AddSignalR();

// CORS & security basics
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCors", policy =>
    {
        policy.WithOrigins("https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("DefaultCors");

app.UseAuthentication();
app.UseAuthorization();

// Tenant resolution middleware MUST run before controllers that rely on tenant
app.UseMiddleware<TenantResolutionMiddleware>();

app.MapControllers();
app.MapHub<NotificationHub>("/hubs/notifications");

app.Run();
