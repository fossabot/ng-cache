using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ng_cache_aspnetcore_sample.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var transferCacheData = new { Greeting = "From ASP.Net Core"};
            ViewData["TransferData"] = CreateStateTransferScript("APP_CACHE", transferCacheData);

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        private static string CreateStateTransferScript(string transferStateKey, object transferStateData)
        {
            var jsonStr = JsonConvert.SerializeObject(transferStateData,
                new JsonSerializerSettings() {ContractResolver = new CamelCasePropertyNamesContractResolver()});
            // var jsonStr = JsonConvert.SerializeObject(transferStateData);
            return $"<script>window['{transferStateKey}'] = '{jsonStr}';</script>";
        }
    }
}
