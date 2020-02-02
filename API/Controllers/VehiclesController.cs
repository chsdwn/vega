using System;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly VegaDbContext _dbContext;

        public VehiclesController(VegaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var vehicleList = await _dbContext.Vehicles.Include(v => v.Model.Make).Include(v => v.VehicleFeatures).ToListAsync();
            return Ok(vehicleList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vehicle = await _dbContext.Vehicles
                .Include(v => v.Model.Make)
                .Include(v => v.VehicleFeatures)
                .FirstOrDefaultAsync(v => v.Id == id);

            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Vehicle vehicle)
        {
            if(!ModelState.IsValid) 
            {
                return BadRequest("Invalid vehicle data");
            }

            var createdVehicle = _dbContext.Add(vehicle);
            await _dbContext.SaveChangesAsync();
            return Ok("Vehicle created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody]Vehicle updateVehicle, int id)
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.Id == id);
            clearFeatures(id);
            vehicle.ModelId = updateVehicle.ModelId;
            vehicle.VehicleRegistered = updateVehicle.VehicleRegistered;
            vehicle.VehicleFeatures = updateVehicle.VehicleFeatures;
            vehicle.ContactName = updateVehicle.ContactName;
            vehicle.ContactPhone = updateVehicle.ContactPhone;
            vehicle.ContactEmail = updateVehicle.ContactEmail;
            vehicle.LastUpdate = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();

            return Ok("Vehicle succesfully updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.Id == id);
            _dbContext.Vehicles.Remove(vehicle);
            await _dbContext.SaveChangesAsync();

            return Ok($"Vehicle with id: {id} succesfully deleted.");
        }

        private async void clearFeatures(int vehicleId)
        {
            var features = await _dbContext.VehicleFeatures.ToListAsync();
            var featuresToDelete = features.FindAll(f => f.VehicleId == vehicleId);

            foreach(var featureToDelete in featuresToDelete) 
            {
                _dbContext.VehicleFeatures.Remove(featureToDelete);
            }
        }
    }
}