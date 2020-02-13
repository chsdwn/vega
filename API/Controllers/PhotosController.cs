using System;
using System.IO;
using System.Linq;
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
        private readonly int MAX_FILE_SIZE = 10 * 1024 * 1024;
        private readonly string[] ALLOWED_FILE_EXTENSIONS = new[] {".jpg", ".jpeg", ".png"};

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

            if(file == null) return BadRequest("No image found");
            if(file.Length == 0) return BadRequest("Empty file");
            if(file.Length > MAX_FILE_SIZE) return BadRequest("Max file size exceeded");
            if(!ALLOWED_FILE_EXTENSIONS.Any(e => e == Path.GetExtension(file.FileName))) 
                return BadRequest("Invalid image type");

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