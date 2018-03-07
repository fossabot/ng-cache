using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace ng_cache_aspnetcore_sample.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "user 1", "user 2", "user 3" };
        }
    }
}
