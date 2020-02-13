using System;
using System.IO;
using System.Threading.Tasks;
using API.Core;
using API.Core.Models;
using API.DTOs;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/vehicles/{vehicleId}/[controller]")]
    public class PhotosController : ControllerBase
    {
        public readonly IWebHostEnvironment _host;
        public readonly IVehicleRepository _vehicleRepo;
        public readonly IUnitOfWork _unitOfWork;
        public readonly IMapper _mapper;

        public PhotosController(
            IWebHostEnvironment host, 
            IVehicleRepository vehicleRepo, 
            IUnitOfWork unitOfWork)
        {
            _host = host;
            _vehicleRepo = vehicleRepo;
            _unitOfWork = unitOfWork;
            _mapper = new Mapper(AutoMapperProfile.config);
        }
        
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, [FromForm]IFormFile file)
        {
            var vehicle = await _vehicleRepo.Get(vehicleId, includeRelated: false);
            if(vehicle == null)
                return NotFound();

            var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");

            if(!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName};
            vehicle.Photos.Add(photo);

            if(await _unitOfWork.CompleteAsync())
            {
                var photoToReturn = _mapper.Map<PhotoResource>(photo);
                return Ok(photoToReturn);
            }

            return BadRequest("An error occured while saving photo");
        }
    }
}