using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IVehicleRepository
    {
         void Add(Vehicle vehicle);
         void Delete(Vehicle vehicle);
         Task<Vehicle> Get(int id, bool includeRelated = true);
         Task<IEnumerable<Vehicle>> GetAll();
    }
}