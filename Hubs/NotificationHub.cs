using AngularDashboard.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace AngularDashboard.Hubs
{
    [Authorize]
    public class NotificationHub: Hub
    {
        private readonly ITenantProvider _tenantProvider;
        public NotificationHub(ITenantProvider tenantProvider) => _tenantProvider = tenantProvider;

        public override Task OnConnectedAsync()
        {
            // Join the tenant group
            var tenantId = _tenantProvider.Current.Id;
            Groups.AddToGroupAsync(Context.ConnectionId, $"tenant-{tenantId}");
            return base.OnConnectedAsync();
        }

        public async Task SendTenantMessage(string message)
        {
            var tenantId = _tenantProvider.Current.Id;
            await Clients.Group($"tenant-{tenantId}").SendAsync("ReceiveMessage", message);
        }
    }
}
