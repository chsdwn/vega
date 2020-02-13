using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core;
using API.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext _dbContext;

        public PhotoRepository(VegaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Photo>> GetAll(int vehicleId)
        {
            var photos = await _dbContext.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
            return photos;
        }
    }
}