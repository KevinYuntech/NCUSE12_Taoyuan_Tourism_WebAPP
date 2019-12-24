using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot
{
    [Authorize]
    public class EditSpotController : Controller
    {
        protected SpotDbContext _context;
        public EditSpotController(SpotDbContext context)
        {
            this._context = context;
        }

        [HttpPut]
        public IActionResult EditSpot(PublicSpot publicSpot)
        {   
            var tmp_publicSpot = _context.PublicSpot.SingleOrDefault(x => x.Id == publicSpot.Id);
            if (tmp_publicSpot == null)
            {
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"此景點資料為空",null)) });
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
                _context.Entry(tmp_publicSpot).CurrentValues.SetValues(publicSpot);
                _context.SaveChanges(); 
                
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(true,"修改資料成功",publicSpot)) });
            }
        }
    }
}