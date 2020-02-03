using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.DTOs
{
    public class VehicleForCreation
    {
        [Required]
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        public ICollection<int> Features { get; set; }

        [Required]
        public ContactResource Contact { get; set; }

        public VehicleForCreation()
        {
            Features = new Collection<int>();
        }
    }
}