using AngularDashboard.Models;
using AngularDashboard.Services;
using Microsoft.EntityFrameworkCore;

namespace AngularDashboard.Data
{
    public interface ITenantDbContextFactory
    {
        AppDbContext CreateContextForTenant(TenantInfo tenant);
    }

    public class TenantDbContextFactory : ITenantDbContextFactory
    {
        private readonly IServiceProvider _provider;
        public TenantDbContextFactory(IServiceProvider provider) => _provider = provider;

        public AppDbContext CreateContextForTenant(TenantInfo tenant)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer(tenant.ConnectionString);
            var tenantProvider = _provider.GetRequiredService<ITenantProvider>();
            return new AppDbContext(optionsBuilder.Options, tenantProvider);
        }
    }
}
