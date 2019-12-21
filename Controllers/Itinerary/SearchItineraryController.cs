using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Itinerary
{
    public class SearchItineraryController : Controller
    {
        public IActionResult SearchItinerary()
        {
            return View();
        }
    }
}