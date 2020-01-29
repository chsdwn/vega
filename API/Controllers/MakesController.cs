using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MakesController : ControllerBase
    {
        private readonly VegaDbContext _dbContext;

        public MakesController(VegaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Make>> Get()
        {
            var makes = await _dbContext.Makes.Include(m => m.Models).ToListAsync();
            return makes;
        }
    }
}