using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Extensions;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Itinerary;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Itinerary
{
    public class AddItineraryController : Controller
    {
        [HttpPost]
        public IActionResult AddItinerary(SpotModel spotModel)
        {
            //創建初始ItineraryList
            //新增景點資料進session
            //將物件包呈object傳進json
            //創建list儲存景點

            var ItineraryList = HttpContext.Session.GetObject<ItineraryModel>("ItineraryList");
            if(ItineraryList == null)
            {
                ItineraryModel itineraryModel = new ItineraryModel();
                itineraryModel.add(spotModel);
                HttpContext.Session.SetObject("ItineraryList", itineraryModel);
                ItineraryList = itineraryModel;
                return Json(new { status = "首次新增", message = Newtonsoft.Json.JsonConvert.SerializeObject(ItineraryList.GetListCount()) });
            }
            else
            {
                ItineraryList.add(spotModel);
                HttpContext.Session.SetObject("ItineraryList", ItineraryList);
                
                return Json(new { status = "再次新增", message = Newtonsoft.Json.JsonConvert.SerializeObject(ItineraryList.GetListCount()) });
            }

            

            

        }
    }
}