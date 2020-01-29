using System.Collections.Generic;
using API.Models;

namespace API.DTOs
{
    public class MakesForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }
    }
}