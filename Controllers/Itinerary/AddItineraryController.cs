using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Extensions;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Itinerary;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Itinerary
{
    public class AddItineraryController : Controller
    {
        /*
        [HttpPost]
        public IActionResult AddItinerary(PublicSpot publicSpot)
        {
            //取得 ItineraryList session
            //新增景點資料進session
            //將物件包呈object傳進json
            //需判斷營業時間限制
            List<PublicSpot> ItineraryList = HttpContext.Session.GetComplexData<List<PublicSpot>>("ItineraryList");

            if(ItineraryList == null)
            {   
                List<PublicSpot> tmp = new List<PublicSpot>();
                tmp.Add(publicSpot);
                HttpContext.Session.SetComplexData("ItineraryList", tmp);
                return Json(new { status = "首次新增", message = tmp.Count() });
            }
            else
            {
                ItineraryList.Add(publicSpot);
                HttpContext.Session.SetComplexData("ItineraryList", ItineraryList);
                var tmp = HttpContext.Session.GetComplexData<List<PublicSpot>>("ItineraryList");
                return Json(new { status = "再次新增", message = tmp.Count() });
            }

        }*/

        [HttpPost]
        public IActionResult AddItineraryBySpot_Id(ItineraryModel itineraryModel)
        {
            //取得 ItineraryList session
            //新增景點資料進session
            //將物件包呈object傳進json
            //需判斷營業時間限制
            List<Int32> ItineraryList = HttpContext.Session.GetComplexData<List<Int32>>("ItineraryList");

            if(ItineraryList == null)
            {   
                List<Int32> tmp = new List<Int32>();
                tmp.Add(itineraryModel.Spot_Id);
                HttpContext.Session.SetComplexData("ItineraryList", tmp);
                return Json(new { status = "首次新增", message = tmp.Count() });
            }
            else
            {
                ItineraryList.Add(itineraryModel.Spot_Id);
                HttpContext.Session.SetComplexData("ItineraryList", ItineraryList);
                var tmp = HttpContext.Session.GetComplexData<List<Int32>>("ItineraryList");
                return Json(new { status = "再次新增", message = tmp.Count() });
            }

        }
    }
}