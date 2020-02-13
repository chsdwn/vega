using System;
using System.Collections.Generic;
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
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [ApiController]
    [Route("api/vehicles/{vehicleId}/[controller]")]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoRepository _repo;
        private readonly IWebHostEnvironment _host;
        private readonly IVehicleRepository _vehicleRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PhotoSettings photoSettings;

        public PhotosController(
            IPhotoRepository repo,
            IWebHostEnvironment host, 
            IVehicleRepository vehicleRepo, 
            IUnitOfWork unitOfWork,
            IOptionsSnapshot<PhotoSettings> options)
        {
            _repo = repo;
            _host = host;
            _vehicleRepo = vehicleRepo;
            _unitOfWork = unitOfWork;
            _mapper = new Mapper(AutoMapperProfile.config);
            photoSettings = options.Value;
        }
        
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, [FromForm]IFormFile file)
        {
            var vehicle = await _vehicleRepo.Get(vehicleId, includeRelated: false);
            if(vehicle == null)
                return NotFound();

            if(file == null) return BadRequest("No image found");
            if(file.Length == 0) return BadRequest("Empty file");
            if(file.Length > photoSettings.MaxSize) return BadRequest("Max file size exceeded");
            if(!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid image type");

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

        [HttpGet]
        public async Task<IActionResult> GetAll(int vehicleId)
        {
            var photos = await _repo.GetAll(vehicleId);
            var photoList = _mapper.Map<IEnumerable<PhotoResource>>(photos);

            return Ok(photoList);
        }
    }
}