namespace API.DTOs
{
    public class FilterByMakeResource
    {
        public int MakeId { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
    }
}