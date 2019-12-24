using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.SearchSpot
{
    public class SearchPublicSpotController : SearchSpotController
    {
        public SearchPublicSpotController(SpotDbContext context) : base(context)
        {
        }

        [HttpGet]
        public  override IActionResult SearchSpotByDistrict(String zipcode)
        {
            //判斷郵遞區號, 回傳該郵遞區號對應景點資料
            IList result = this._context.PublicSpot.Where(x => x.Name == zipcode).ToList();

            return Json(new { message = result });
            
        }

        [HttpGet]
        public  override IActionResult SearchSpotById(int Id)
        {
            //判斷郵遞區號, 回傳該郵遞區號對應景點資料
            IList result = this._context.PublicSpot.Where(x => x.Id == Id).ToList();

            return Json(new { message = result });
            
        }

    }
}