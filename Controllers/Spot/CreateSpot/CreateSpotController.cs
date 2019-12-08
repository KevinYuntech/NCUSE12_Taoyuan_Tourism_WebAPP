using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.CreateSpot
{
    public abstract class CreateSpotController : Controller
    {
        protected SpotDbContext _context;
        public CreateSpotController(SpotDbContext context)
        {
            this._context = context;
        }

        [HttpPost]
        public abstract IActionResult CreateSpotInfo(String name, String address);


    }
}