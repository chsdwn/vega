using System;
using API.Models;

namespace API.DTOs
{
    public class VehicleForList
    {
        public int Id { get; set; }
        public KeyValuePairResource Make { get; set; }
        public KeyValuePairResource Model { get; set; }
        public bool VehicleRegistered { get; set; }
        public string ContactName { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}