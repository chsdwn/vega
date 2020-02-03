using System.Threading.Tasks;
using API.Core;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDbContext _dbContext;

        public UnitOfWork(VegaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CompleteAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}