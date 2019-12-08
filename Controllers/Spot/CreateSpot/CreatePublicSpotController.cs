using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.CreateSpot
{
    public class CreatePublicSpotController : CreateSpotController
    {
        public override IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Get(int Id)
        {
            return Json(new { Id = Id });
        }

        [HttpPost]
        public IActionResult Post([FromBody]PublicSpot publicSpot)
        {
            return Json(new ApiResult());
        }
    }
}