using AutoMapper;
using API.Core.Models;
using API.DTOs;
using System.Linq;
using System.Collections.Generic;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public static MapperConfiguration config = new MapperConfiguration(cfg => 
            {
                // Domain to API Resource
                cfg.CreateMap<Make, MakeResource>();
                cfg.CreateMap<Make, KeyValuePairResource>();
                cfg.CreateMap<Model, KeyValuePairResource>();
                cfg.CreateMap<Feature, KeyValuePairResource>();
                cfg.CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));    
                cfg.CreateMap<Vehicle, VehicleForList>()
                    .ForMember(
                        dest => dest.Make,
                        opt => opt.MapFrom(src => src.Model.Make)
                    )
                    .ForMember(
                        dest => dest.Model,
                        opt => opt.MapFrom(src => src.Model)
                    );        
                cfg.CreateMap<Vehicle, VehicleForDetailed>()
                    .ForMember(
                        dest => dest.Make,
                        opt => opt.MapFrom(src => src.Model.Make)
                    )
                    .ForMember(
                        dest => dest.Model,
                        opt => opt.MapFrom(src => src.Model)
                    )
                    .ForMember(
                        dest => dest.Features,
                        opt => opt.MapFrom(src => src.Features.Select(
                            vf => new KeyValuePairResource { Id = vf.Feature.Id, Name = vf.Feature.Name}
                        ))
                    )
                    .ForMember(
                        dest => dest.Contact,
                        opt => opt.MapFrom(src => new ContactResource {
                            Name = src.ContactName,
                            Phone = src.ContactPhone,
                            Email = src.ContactEmail
                        })
                    );

                // API Resource to Domain
                cfg.CreateMap<VehicleQueryResource, VehicleQuery>();
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
                            var removedFeatures = v.Features.Where(f => !vfc.Features.Contains(f.FeatureId));
                            foreach(var feature in removedFeatures.ToList())
                                v.Features.Remove(feature);

                            // Add new features
                            var addedFeatures = vfc.Features
                                .Where(id => !v.Features.Any(f => f.FeatureId == id))
                                .Select(id => new VehicleFeature { FeatureId = id});
                            foreach(var feature in addedFeatures.ToList())
                                v.Features.Add(feature);
                        }
                    );
            }
        );
    }
}