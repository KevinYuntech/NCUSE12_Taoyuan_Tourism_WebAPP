using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Extensions;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Itinerary
{
    public class AddItineraryController : Controller
    {
        [HttpPost]
        public IActionResult AddItinerary(SpotModel spotModel)
        {
            //取得 ItineraryList session
            //新增景點資料進session
            //將物件包呈object傳進json
            //需判斷營業時間限制
            List<SpotModel> ItineraryList = HttpContext.Session.GetComplexData<List<SpotModel>>("ItineraryList");

            if(ItineraryList == null)
            {   
                List<SpotModel> tmp = new List<SpotModel>();
                tmp.Add(spotModel);
                HttpContext.Session.SetComplexData("ItineraryList", tmp);
                return Json(new { status = "首次新增", message = tmp.Count() });
            }
            else
            {
                ItineraryList.Add(spotModel);
                HttpContext.Session.SetComplexData("ItineraryList", ItineraryList);
                var tmp = HttpContext.Session.GetComplexData<List<SpotModel>>("ItineraryList");
                return Json(new { status = "再次新增", message = tmp.Count() });
            }

        }

    }
}