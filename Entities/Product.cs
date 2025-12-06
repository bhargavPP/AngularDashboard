namespace AngularDashboard.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string TenantId { get; set; } = default!;
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
    }
}
