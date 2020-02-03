using System;
using API.Models;

namespace API.DTOs
{
    public class VehicleForList
    {
        public int Id { get; set; }
        public string MakeName { get; set; }
        public string ModelName { get; set; }
        public bool VehicleRegistered { get; set; }
        public string ContactName { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}