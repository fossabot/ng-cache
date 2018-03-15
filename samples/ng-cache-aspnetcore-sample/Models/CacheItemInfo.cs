namespace ng_cache_aspnetcore_sample.Models
{
    public class CacheItemInfo
    {
        public string Hash { get; set; }
        public long? AbsoluteExpiration { get; set; }
    }
}
