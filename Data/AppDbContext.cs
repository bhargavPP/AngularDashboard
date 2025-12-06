using AngularDashboard.Services;
using Microsoft.EntityFrameworkCore;
using AngularDashboard.Entities;

namespace AngularDashboard.Data
{
    public class AppDbContext :DbContext
    {
        private readonly ITenantProvider _tenantProvider;

        public AppDbContext(DbContextOptions<AppDbContext> options, ITenantProvider tenantProvider)
            : base(options)
        {
            _tenantProvider = tenantProvider;
        }

        // Example tables
        public DbSet<TileMetric> TileMetrics { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Shared DB multi-tenant approach: apply global filter
            modelBuilder.Entity<TileMetric>().HasQueryFilter(t => t.TenantId == _tenantProvider.Current.Id);
            modelBuilder.Entity<Product>().HasQueryFilter(p => p.TenantId == _tenantProvider.Current.Id);

            base.OnModelCreating(modelBuilder);
        }
    }

}
