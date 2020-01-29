using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {
        }
    }
}