using System.Collections.Generic;
using System.Threading.Tasks;
using API.Core;
using API.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _dbContext;

        public VehicleRepository(VegaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(Vehicle vehicle)
        {
            _dbContext.Vehicles.Add(vehicle);
        }

        public void Delete(Vehicle vehicle)
        {
            _dbContext.Vehicles.Remove(vehicle);
        }

        public async Task<Vehicle> Get(int id, bool includeRelated = true)
        {
            if(!includeRelated)
                return await _dbContext.Vehicles.FindAsync(id);

            return await _dbContext.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<IEnumerable<Vehicle>> GetAll()
        {
            return await _dbContext.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .ToListAsync();
        }
    }
}