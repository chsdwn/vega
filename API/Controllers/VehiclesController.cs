using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Helpers;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly VegaDbContext _dbContext;
        private readonly IMapper _mapper;

        public VehiclesController(VegaDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = new Mapper(AutoMapperProfile.config);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var vehicleListFromDb = await _dbContext.Vehicles.Include(v => v.Model).ToListAsync();
            var vehicleList = _mapper.Map<IEnumerable<VehicleForList>>(vehicleListFromDb);
            return Ok(vehicleList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vehicleFromDb = await _dbContext.Vehicles
                .Include(v => v.Features)
                .FirstOrDefaultAsync(v => v.Id == id);
            var vehicle = _mapper.Map<VehicleForDetailed>(vehicleFromDb);
            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]VehicleForCreation vehicleForCreationDto)
        {
            if(!ModelState.IsValid) 
            {
                return BadRequest("Invalid vehicle data");
            }

            var vehicle = _mapper.Map<Vehicle>(vehicleForCreationDto);
            vehicle.LastUpdate = DateTime.UtcNow;
            _dbContext.Vehicles.Add(vehicle);

            await _dbContext.SaveChangesAsync();

            return Ok("Vehicle created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody]VehicleForUpdate vehicleForUpdateDto, int id)
        {
            var vehicleFromDb = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.Id == id);
            clearFeatures(id);

            _mapper.Map(vehicleForUpdateDto, vehicleFromDb);
            
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