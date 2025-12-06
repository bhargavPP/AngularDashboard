using AngularDashboard.Models;

namespace AngularDashboard.Services
{
    public class HttpContextTenantProvider : ITenantProvider
    {
        private readonly IHttpContextAccessor _accessor;
        public HttpContextTenantProvider(IHttpContextAccessor accessor) => _accessor = accessor;
        public TenantInfo Current
        {
            get
            {
                var ctx = _accessor.HttpContext;
                if (ctx?.Items["TenantInfo"] is TenantInfo t) return t;
                throw new InvalidOperationException("Tenant not resolved for current context.");
            }
        }
    }
}
