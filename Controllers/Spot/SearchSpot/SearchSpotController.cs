using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.SearchSpot
{
    public abstract class SearchSpotController : Controller
    {
        protected SpotDbContext _context;

        public SearchSpotController(SpotDbContext context)
        {
            this._context = context;
        }
        [HttpGet]
        public  abstract IActionResult SearchSpotByDistrict(String zipcode);

        [HttpGet]
        public abstract IActionResult SearchSpotById(int id);
    }
}