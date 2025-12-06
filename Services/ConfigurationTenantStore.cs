using AngularDashboard.Models;
namespace AngularDashboard.Services
{
    public class ConfigurationTenantStore : ITenantStore
    {
        private readonly IReadOnlyDictionary<string, TenantInfo> _tenants;

        public ConfigurationTenantStore(IConfiguration config)
        {
            var section = config.GetSection("tenants");
            var arr = section.Get<IEnumerable<TenantInfo>>() ?? Enumerable.Empty<TenantInfo>();
            _tenants = arr.ToDictionary(t => t.Id, StringComparer.OrdinalIgnoreCase);
        }

        public IEnumerable<TenantInfo> GetAll() => _tenants.Values;

        public bool TryGetTenant(string tenantId, out TenantInfo? tenant)
        {
            return _tenants.TryGetValue(tenantId ?? string.Empty, out tenant);
        }
    }
}
