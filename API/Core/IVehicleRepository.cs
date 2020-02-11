using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Models;
using API.DTOs;
using API.Helpers;

namespace API.Core
{
    public interface IVehicleRepository
    {
        void Add(Vehicle vehicle);
        void Delete(Vehicle vehicle);
        Task<Vehicle> Get(int id, bool includeRelated = true);
        Task<QueryResult<Vehicle>> GetAll(VehicleQuery vehicleQuery);
    }
}