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
        private readonly IVehicleRepository _repo;
        private readonly IMapper _mapper;

        public VehiclesController(IVehicleRepository repo)
        {
            _repo = repo;
            _mapper = new Mapper(AutoMapperProfile.config);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var vehicleListFromDb = await _repo.GetAll();
            var vehicleList = _mapper.Map<IEnumerable<VehicleForList>>(vehicleListFromDb);
            return Ok(vehicleList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vehicleFromDb = await _repo.Get(id);

            if(vehicleFromDb == null)
                return NotFound();

            var vehicle = _mapper.Map<VehicleForDetailed>(vehicleFromDb);
            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]VehicleForCreation vehicleForCreationDto)
        {
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<Vehicle>(vehicleForCreationDto);
            vehicle.LastUpdate = DateTime.UtcNow;
            _repo.Add(vehicle);

            if(await _repo.SaveAll())
                return Ok("Vehicle Created");

            return BadRequest("An error occured while vehicle creating.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody]VehicleForCreation vehicleForUpdateDto, int id)
        {
            var vehicleFromDb = await _repo.Get(id);

            if(vehicleFromDb == null)
                return NotFound();

            _mapper.Map(vehicleForUpdateDto, vehicleFromDb);
            vehicleFromDb.LastUpdate = DateTime.UtcNow;
            
            if(await _repo.SaveAll())
                return Ok("Vehicle succesfully updated.");

            return BadRequest("An error occured while vehicle updating.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vehicle = await _repo.Get(id);

            if(vehicle == null)
                return NotFound();

            _repo.Delete(vehicle);
            
            if(await _repo.SaveAll())
                return Ok($"Vehicle with id: {id} succesfully deleted.");

            return BadRequest("An error occured while vehicle deleting.");
        }
    }
}