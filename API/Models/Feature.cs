using System.Collections.Generic;

namespace API.Models
{
    public class Feature
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<VehicleFeature> VehicleFeatures { get; set; }
    }
}