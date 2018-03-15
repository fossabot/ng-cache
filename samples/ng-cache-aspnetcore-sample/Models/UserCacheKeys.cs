namespace ng_cache_aspnetcore_sample.Models
{
    public class UserCacheKeys
    {
        public static readonly string Users = "users";
        public static readonly string UsersCts = $"{Users}.cts";
        public static readonly string UsersCacheInfo = $"{Users}.cacheinfo";

    }
}
