using AngularDashboard.Models;

namespace AngularDashboard.Services
{
    public interface ITenantStore
    {
        bool TryGetTenant(string tenantId, out TenantInfo? tenant);
        IEnumerable<TenantInfo> GetAll();
    }
}
