namespace ng_cache_aspnetcore_sample.Models
{
    public class CacheCheckResult
    {
        public bool Expired { get; set; }
        public string Hash { get; set; }
        public long? AbsoluteExpiration { get; set; }
    }
}
