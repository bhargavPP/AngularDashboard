namespace AngularDashboard.Models
{
    public class TenantInfo
    {
        public string Id { get; init; } = default!;
        public string Name { get; init; } = default!;
        public string? ConnectionString { get; init; }
    }
}
