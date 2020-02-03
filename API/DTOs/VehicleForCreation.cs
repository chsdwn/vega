using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using API.Models;

namespace API.DTOs
{
    public class VehicleForCreation
    {
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        public ICollection<int> Features { get; set; }
        public ContactResource Contact { get; set; }

        public VehicleForCreation()
        {
            Features = new Collection<int>();
        }
    }
}