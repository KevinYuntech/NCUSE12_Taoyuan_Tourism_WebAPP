using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot
{
    [Authorize]
    public  class CreateSpotController : Controller
    {
        protected SpotDbContext _context;
        public CreateSpotController(SpotDbContext context)
        {
            this._context = context;
        }

        [HttpPost]
        public  IActionResult CreateSpotInfo(SpotModel spotModel)
        {
            //驗證輸入欄位正確性, 可抽象化
            //驗證傳入資料是否為空
            if(spotModel == null)
            {
                return Json(new { message = " 輸入資料為空值" });
            }

            //驗證欄位
            if (!ModelState.IsValid)
            {
                var  returnData = new
                {
                    // 取得所有錯誤欄位訊息
                    ModelStateErrors = ModelState.Where(x => x.Value.Errors.Count > 0)
                     .ToDictionary(k => k.Key, k => k.Value.Errors.Select(e => e.ErrorMessage).ToArray())
                };
                return Json(new { message = Newtonsoft.Json.JsonConvert.SerializeObject(returnData) });
            }

            //新增資料
            String userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // 取得目前登入者user ID

            var publicSpot = new PublicSpot();
            publicSpot.Name = spotModel.Name;
            publicSpot.Address = spotModel.Address;
            publicSpot.UserId = userId;
            this._context.PublicSpot.Add(publicSpot);
            this._context.SaveChanges();

            return Json(new { message = "新增資料成功" });
        }
    }


    }
