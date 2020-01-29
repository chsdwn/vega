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
    public class FeaturesController : ControllerBase
    {
        private readonly VegaDbContext _dbContext;
        private readonly IMapper _mapper;

        public FeaturesController(VegaDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = new Mapper(AutoMapperProfile.config);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var features = await _dbContext.Features.ToListAsync();
            var featuresList = _mapper.Map<IEnumerable<FeaturesForListDto>>(features);
            return Ok(featuresList);
        }
    }
}