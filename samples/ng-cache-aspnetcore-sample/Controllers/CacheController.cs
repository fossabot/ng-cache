using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using ng_cache_aspnetcore_sample.Models;

namespace ng_cache_aspnetcore_sample.Controllers
{
    [Route("api/[controller]")]
    public class CacheController : Controller
    {
        private readonly IMemoryCache _cache;

        public CacheController(IMemoryCache cache)
        {
            _cache = cache;
        }

        [HttpGet("{key}")]
        public CacheItemInfo Get(string key)
        {
            return _cache.Get<CacheItemInfo>($"{key}.cacheinfo");
        }

        [HttpPost("check")]
        public CacheCheckResult Post([FromBody]CacheCheckRequest model)
        {
            var item = !string.IsNullOrWhiteSpace(model.Key)
                ? _cache.Get<CacheItemInfo>(model.Key + ".cacheinfo")
                : null;
            var valid = item != null && model.Hash != null && item.Hash == model.Hash;

            return new CacheCheckResult
            {
                Expired = !valid,
                Hash = item?.Hash,
                AbsoluteExpiration =  item?.AbsoluteExpiration
            };
        }
    }
}

