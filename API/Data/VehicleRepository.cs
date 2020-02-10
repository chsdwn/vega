using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core;
using API.Core.Models;
using API.Helpers;
using API.DTOs;
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

        public async Task<IEnumerable<Vehicle>> Sort(string sortOrder)
        {
            var vehicles = await GetAll();

            switch (sortOrder)
            {
                case "make":
                    vehicles = vehicles.OrderBy(v => v.Model.Make.Name);
                    break;
                case "make_desc":
                    vehicles = vehicles.OrderByDescending(v => v.Model.Make.Name);
                    break;
                case "model":
                    vehicles = vehicles.OrderBy(v => v.Model.Name);
                    break;
                case "model_desc":
                    vehicles = vehicles.OrderByDescending(v => v.Model.Name);
                    break;
                case "name":
                    vehicles = vehicles.OrderBy(v => v.ContactName);
                    break;
                case "name_desc":
                    vehicles = vehicles.OrderByDescending(v => v.ContactName);
                    break;
                default:
                    vehicles = vehicles.OrderBy(v => v.Id);
                    break;
            }

            return vehicles;
        }

        public async Task<IEnumerable<Vehicle>> GetPage(int pageSize, int pageNumber)
        {
            var vehicles = _dbContext.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .AsNoTracking();
            return await PaginatedList<Vehicle>.CreateAsync(vehicles, pageNumber, pageSize);
        }

        public async Task<int> GetCount()
        {
            var count = await _dbContext.Vehicles.CountAsync();
            return count;
        }

        public async Task<IEnumerable<Vehicle>> FilterByMake(int makeId, int pageSize, int pageNumber)
        {
            var vehicles = _dbContext.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Where(v => v.Model.Make.Id == makeId)
                .AsNoTracking();
            return await PaginatedList<Vehicle>.CreateAsync(vehicles, pageNumber, pageSize);
        }

        public async Task<int> FilterByMakeCount(int makeId)
        {
            var count = await _dbContext.Vehicles
                .Where(v => v.Model.MakeId == makeId)
                .CountAsync();
            return count;
        }
    }
}