using AutoMapper;
using API.Models;
using API.DTOs;
using System.Linq;
using System.Collections.Generic;

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
                        opt => opt.Ignore()
                    )
                    .AfterMap(
                        (vfc, v) => {
                            // Remove unselected objects
                            var removedFeatures = new List<VehicleFeature>();
                            foreach(var feature in v.Features)
                            {
                                if(!vfc.Features.Contains(feature.FeatureId))
                                {
                                    removedFeatures.Add(feature);
                                }
                            }

                            foreach(var feature in removedFeatures)
                            {
                                v.Features.Remove(feature);
                            }

                            // Add new features
                            foreach(var id in vfc.Features)
                            {
                                if(!v.Features.Any(f => f.FeatureId == id))
                                {
                                    v.Features.Add(new VehicleFeature { FeatureId = id });
                                }
                            }
                        }
                    );
            }
        );
    }
}