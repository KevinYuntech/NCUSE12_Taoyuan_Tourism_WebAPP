using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.SearchSpot
{
    public abstract class SearchSpotController : Controller
    {
        public abstract IActionResult Index();
    }
}