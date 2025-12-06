using AngularDashboard.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace AngularDashboard.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class TenantResolutionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ITenantStore _tenantStore;

        public TenantResolutionMiddleware(RequestDelegate next, ITenantStore tenantStore)
        {
            _next = next;
            _tenantStore = tenantStore;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Priority: Header X-Tenant-ID -> JWT claim "tenant_id" -> subdomain
            string? tenantId = context.Request.Headers["X-Tenant-ID"].FirstOrDefault();

            if (string.IsNullOrEmpty(tenantId) && context.User?.Identity?.IsAuthenticated == true)
            {
                tenantId = context.User.Claims.FirstOrDefault(c => c.Type == "tenant_id")?.Value;
            }

            if (string.IsNullOrEmpty(tenantId))
            {
                // parse subdomain if host like tenant1.example.com
                var host = context.Request.Host.Host;
                var firstPart = host?.Split('.')?.FirstOrDefault();
                if (!string.IsNullOrEmpty(firstPart) && firstPart.Contains("localhost") == false)
                    tenantId = firstPart;
            }

            if (string.IsNullOrEmpty(tenantId) || !_tenantStore.TryGetTenant(tenantId, out var tenant))
            {
                // For public endpoints you may allow tenant null; here we force valid tenant
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("Invalid or missing tenant.");
                return;
            }

            // Attach tenant to HttpContext items (and a scoped provider will read it)
            context.Items["TenantInfo"] = tenant;
            await _next(context);
        }
    }
}
