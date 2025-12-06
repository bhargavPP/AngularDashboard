namespace AngularDashboard.Entities
{
    public class TileMetric
    {
        public int Id { get; set; }
        public string TenantId { get; set; } = default!;
        public string Name { get; set; } = default!;
        public decimal Value { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
