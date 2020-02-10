using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Core;
using API.Core.Models;
using API.DTOs;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleRepository _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VehiclesController(IVehicleRepository repo, IUnitOfWork unitOfWork)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
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

            if(await _unitOfWork.CompleteAsync())
            {
                vehicle = await _repo.Get(vehicle.Id);
                var vehicleToReturn = _mapper.Map<VehicleForDetailed>(vehicle);
                return Ok(vehicleToReturn);
            }

            return BadRequest("An error occured while vehicle creating.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody]VehicleForCreation vehicleForUpdateDto, int id)
        {
            var vehicle = await _repo.Get(id);

            if(vehicle == null)
                return NotFound();

            _mapper.Map(vehicleForUpdateDto, vehicle);
            vehicle.LastUpdate = DateTime.UtcNow;
            
            if(await _unitOfWork.CompleteAsync())
            {
                vehicle = await _repo.Get(id);
                var vehicleToReturn = _mapper.Map<VehicleForDetailed>(vehicle);
                return Ok(vehicleToReturn);
            }

            return BadRequest("An error occured while vehicle updating.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vehicle = await _repo.Get(id, includeRelated: false);

            if(vehicle == null)
                return NotFound();

            _repo.Delete(vehicle);
            
            if(await _unitOfWork.CompleteAsync())
                return Ok(id);

            return BadRequest("An error occured while vehicle deleting.");
        }

        [HttpPost("sort")]
        public async Task<IActionResult> Sort([FromBody]SortingResource sortingResource)
        {
            var vehicles = await _repo.Sort(sortingResource);
            var vehicleList = _mapper.Map<IEnumerable<VehicleForList>>(vehicles);
            return Ok(vehicleList);
        }

        [HttpPost("page/{pageNumber}/size/{pageSize}")]
        public async Task<IActionResult> GetPage(int pageNumber, int pageSize)
        {
            var vehicles = await _repo.GetPage(pageSize, pageNumber);
            var vehicleList = _mapper.Map<IEnumerable<VehicleForList>>(vehicles);
            return Ok(vehicleList);
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetCount()
        {
            var count = await _repo.GetCount();
            return Ok(count);
        }

        [HttpPost("filterByMake")]
        public async Task<IActionResult> FilterByMake([FromBody]FilterByMakeResource filterByMakeResource)
        {
            var vehicles = await _repo.FilterByMake(
                filterByMakeResource.MakeId, 
                filterByMakeResource.PageSize, 
                filterByMakeResource.PageNumber);
            var vehicleList = _mapper.Map<IEnumerable<VehicleForList>>(vehicles);
            return Ok(vehicleList);
        }

        [HttpPost("filterByMake/count")]
        public async Task<IActionResult> FilterByMakeCount([FromBody]int makeId)
        {
            var count = await _repo.FilterByMakeCount(makeId);
            return Ok(count);
        }
    }
}