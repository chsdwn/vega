using System;
using System.Collections.Generic;
using API.Models;

namespace API.DTOs
{
    public class VehicleForUpdate
    {
        public int ModelId { get; set; }
        public bool VehicleRegistered { get; set; }
        public ICollection<VehicleFeature> VehicleFeatures { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public DateTime LastUpdate { get; set; }

        public VehicleForUpdate()
        {
            this.LastUpdate = DateTime.UtcNow;
        }
    }
}