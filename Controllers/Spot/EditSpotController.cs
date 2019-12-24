using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot
{
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
            ResultModel resultModel;
            String userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // 取得目前登入者user ID

            var tmp_publicSpot = _context.PublicSpot.SingleOrDefault(x => x.Id == publicSpot.Id);

            if (tmp_publicSpot != null)
            {
                _context.Entry(tmp_publicSpot).CurrentValues.SetValues(publicSpot);
                _context.SaveChanges(); 
                resultModel = new ResultModel(true,"修改資料成功",publicSpot);
            }
            else
            {
                resultModel = new ResultModel(false,"找不到此Model",null);
            }

            return Json(new { message = resultModel });
        }
    }
}