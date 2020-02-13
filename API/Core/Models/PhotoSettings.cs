using System.IO;
using System.Linq;

namespace API.Core.Models
{
    public class PhotoSettings
    {
        public int MaxSize { get; set; }
        public string[] AllowedExtensions { get; set; }

        public bool IsSupported(string fileName)
        {
            return AllowedExtensions.Any(e => e == Path.GetExtension(fileName).ToLower());
        }
    }
}