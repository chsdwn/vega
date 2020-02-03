using System.Threading.Tasks;

namespace API.Data
{
    public interface IUnitOfWork
    {
         Task<bool> CompleteAsync();
    }
}