using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        
        [Required]
        public Model Model { get; set; }

        [Required]
        public int ModelId { get; set; }

        public bool VehicleRegistered { get; set; }

        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }

        [EmailAddress]
        public string ContactEmail { get; set; }

        public DateTime LastUpdate { get; set; }

        public Vehicle()
        {
            this.LastUpdate = DateTime.UtcNow;
        }
    }
}