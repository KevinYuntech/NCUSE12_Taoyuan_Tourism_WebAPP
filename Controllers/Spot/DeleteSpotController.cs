using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;
using Newtonsoft.Json;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot
{
    [Authorize]
    public class DeleteSpotController : Controller
    {
        protected SpotDbContext _context;
        public DeleteSpotController(SpotDbContext context)
        {
            this._context = context;
        }

        [HttpDelete]
        public  IActionResult DeleteSpotById(int Id)
        {
            //判斷景點id, 回傳該id對應景點資料
            var result = this._context.PublicSpot.SingleOrDefault(x => x.Id == Id);

            if(result != null){

                this._context.PublicSpot.Remove(result);
                this._context.SaveChanges();

                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(true,"成功刪除一筆資料",result)) });
            }
            else{
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"找不到任何資料",null)) });
            }

        }
    }
}