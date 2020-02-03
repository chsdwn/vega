using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using API.Models;

namespace API.DTOs
{
    public class VehicleForDetailed
    {
        public int Id { get; set; }
        public KeyValuePairResource Make { get; set; }
        public KeyValuePairResource Model { get; set; }
        public bool IsRegistered { get; set; }
        public ICollection<KeyValuePairResource> Features { get; set; }
        public ContactResource Contact { get; set; }
        public DateTime LastUpdate { get; set; }

        public VehicleForDetailed()
        {
            Features = new Collection<KeyValuePairResource>();
        }
    }
}