using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;
using ng_cache_aspnetcore_sample.Models;
using Newtonsoft.Json.Serialization;

namespace ng_cache_aspnetcore_sample.Controllers
{

    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IMemoryCache _cache;

        public UsersController(IMemoryCache cache)
        {
            _cache = cache;
        }

        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            var users = await _cache.GetOrCreateAsync(UserCacheKeys.Users, entry =>
            {
                var items = new List<string> { "user 1", "user 2", "user 3" };

                var cts = new CancellationTokenSource();
                var cancellationChangeToken = new CancellationChangeToken(cts.Token);

                _cache.Set(UserCacheKeys.UsersCts, cts);

                // For testing only
                entry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddSeconds(100);
                // entry.SlidingExpiration = TimeSpan.FromSeconds(15);
                entry.ExpirationTokens.Add(cancellationChangeToken);

                var hash = JsonConvert.SerializeObject(items).ToMD5Hash(8);

                _cache.Set(UserCacheKeys.UsersCacheInfo,
                    new CacheItemInfo
                    {
                        Hash = hash,
                        AbsoluteExpiration = (long) entry.AbsoluteExpiration
                            ?.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds
                    }, cancellationChangeToken);

                return Task.FromResult(items);
            });

            var cacheItemInfo = _cache.Get<CacheItemInfo>(UserCacheKeys.UsersCacheInfo);
            if (cacheItemInfo != null)
            {
                var jsonStr = JsonConvert.SerializeObject(cacheItemInfo,
                    new JsonSerializerSettings() { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                Response.Headers.Add(UserCacheKeys.UsersCacheInfo, jsonStr);
            }

            return users;
        }

        public void RemoveUserCache()
        {
            _cache.Get<CancellationTokenSource>(UserCacheKeys.UsersCts).Cancel();
        }
    }
}
