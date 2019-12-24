﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Extensions;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Itinerary
{
    public class SearchItineraryController : Controller
    {
        public IActionResult GetCurrentItineraryList()
        {   
            //查詢現有景點行程

            List<SpotModel> ItineraryList = HttpContext.Session.GetComplexData<List<SpotModel>>("ItineraryList");

            return Json(new { message = ItineraryList});
          }
    }
}