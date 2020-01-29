using AutoMapper;
using API.Models;
using API.DTOs;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public static MapperConfiguration config = new MapperConfiguration(cfg => 
            {
                cfg.CreateMap<Make, MakeResource>();
                cfg.CreateMap<Feature, FeaturesForListDto>();
            }
        );
    }
}