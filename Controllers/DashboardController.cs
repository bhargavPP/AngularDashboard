using AngularDashboard.Data;
using AngularDashboard.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularDashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ITenantProvider _tenantProvider;
        public DashboardController(AppDbContext db, ITenantProvider tenantProvider)
        {
            _db = db;
            _tenantProvider = tenantProvider;
        }

        [HttpGet("tiles")]
        public async Task<IActionResult> GetTiles()
        {
            var tenantId = _tenantProvider.Current.Id;
            // since we use global filters, query already scoped
            var tiles = await _db.TileMetrics
                .OrderByDescending(t => t.CreatedAt)
                .Take(20)
                .ToListAsync();

            return Ok(new { tenantId, tiles });
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts(int page = 1, int pageSize = 20)
        {
            var items = await _db.Products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return Ok(items);
        }
    }
}
