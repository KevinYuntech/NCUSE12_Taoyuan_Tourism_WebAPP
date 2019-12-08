using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.CreateSpot
{
    public class CreatePrivateSpotController : CreateSpotController
    {

        public CreatePrivateSpotController(SpotDbContext context) : base(context)
        {
        }

        [HttpPost]
        public override IActionResult CreateSpotInfo(String name, String address)
        {
            //[FromBody]PublicSpot publicSpot

            return Json(new { name = name });
        }

    }
}