using AngularDashboard.Models;

namespace AngularDashboard.Services
{
    public interface ITenantProvider
    {
        TenantInfo Current { get; }
    }
}
