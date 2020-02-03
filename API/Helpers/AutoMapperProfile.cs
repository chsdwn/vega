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
                        dest => dest.Contact,
                        opt => opt.MapFrom(src => new ContactResource {
                            Name = src.ContactName,
                            Phone = src.ContactPhone,
                            Email = src.ContactEmail
                        })
                    )
                    .ForMember(
                        dest => dest.Features,
                        opt => opt.MapFrom(src => src.Features.Select(vf => vf.FeatureId))
                    );
                cfg.CreateMap<Vehicle, VehicleForList>()
                    .ForMember(
                        dest => dest.Model,
                        opt => opt.MapFrom(src => src.Model.Name)
                    );
                cfg.CreateMap<VehicleForCreation, Vehicle>()
                    .ForMember(
                        dest => dest.ContactName,
                        opt => opt.MapFrom(src => src.Contact.Name)
                    )
                    .ForMember(
                        dest => dest.ContactPhone,
                        opt => opt.MapFrom(src => src.Contact.Phone)
                    )
                    .ForMember(
                        dest => dest.ContactEmail,
                        opt => opt.MapFrom(src => src.Contact.Email)
                    )
                    .ForMember(
                        dest => dest.Features,
                        opt => opt.MapFrom(src => src.Features.Select(id => new VehicleFeature { FeatureId = id }))
                    );
                cfg.CreateMap<VehicleForUpdate, Vehicle>();
            }
        );
    }
}