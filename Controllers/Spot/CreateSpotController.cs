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
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;

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
        public  IActionResult CreateSpotInfo(PublicSpot publicSpot)
        {
            //驗證輸入欄位正確性, 可抽象化
            //驗證傳入資料是否為空
            if(publicSpot == null)
            {
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"新增景點資料為空值",null)) });
            }
            else if (!ModelState.IsValid)
            {
                 //驗證欄位
                var  ErrorDataMessage = new
                {
                    // 取得所有錯誤欄位訊息
                    ModelStateErrors = ModelState.Where(x => x.Value.Errors.Count > 0)
                     .ToDictionary(k => k.Key, k => k.Value.Errors.Select(e => e.ErrorMessage).ToArray())
                };
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"新增景點欄位格式有誤",ErrorDataMessage)) });
            }
            else
            {
                //新增資料
                String userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // 取得目前登入者user ID
                
                this._context.PublicSpot.Add(publicSpot);
                this._context.SaveChanges();
                
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(true,"新增景點資料成功",publicSpot)) });
            }

        }
    
        [HttpPost]
        public ActionResult UploadSpotImg()
        {   
            var file = Request.Form.Files[0];

            String filePath = "wwwroot//Img" + file.FileName;
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyToAsync(stream);
            }
             return Json(new { message = JsonConvert.SerializeObject(new ResultModel(true,"新增景點資料成功",null)) });
        }       
    }


    }
