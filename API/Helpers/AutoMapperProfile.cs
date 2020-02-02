using AutoMapper;
using API.Models;
using API.DTOs;
using System.Linq;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public static MapperConfiguration config = new MapperConfiguration(cfg => 
            {
                cfg.CreateMap<Make, MakeResource>();
                cfg.CreateMap<Model, ModelResource>();
                cfg.CreateMap<Feature, FeatureResource>();

                cfg.CreateMap<Vehicle, VehicleForDetailed>()
                    .ForMember(
                        dest => dest.Model,
                        opt => opt.MapFrom(src => src.Model.Name)
                    );
                cfg.CreateMap<Vehicle, VehicleForList>()
                    .ForMember(
                        dest => dest.Model,
                        opt => opt.MapFrom(src => src.Model.Name)
                    );
                cfg.CreateMap<VehicleForCreation, Vehicle>();
                cfg.CreateMap<VehicleForUpdate, Vehicle>();
            }
        );
    }
}