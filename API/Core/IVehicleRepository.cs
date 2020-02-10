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
        Task<IEnumerable<Vehicle>> GetAll();
        Task<IEnumerable<Vehicle>> Sort(string sortOrder);
        Task<IEnumerable<Vehicle>> GetPage(int pageSize, int pageNumber);
        Task<int> GetCount();
        Task<IEnumerable<Vehicle>> FilterByMake(int makeId, int pageSize, int pageNumber);
        Task<int> FilterByMakeCount(int makeId);
    }
}