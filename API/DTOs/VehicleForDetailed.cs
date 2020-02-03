using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using API.Models;

namespace API.DTOs
{
    public class VehicleForDetailed
    {
        public int Id { get; set; }
        public string MakeName { get; set; }
        public string ModelName { get; set; }
        public bool IsRegistered { get; set; }
        public ICollection<int> Features { get; set; }
        public ContactResource Contact { get; set; }
        public DateTime LastUpdate { get; set; }

        public VehicleForDetailed()
        {
            Features = new Collection<int>();
        }
    }
}