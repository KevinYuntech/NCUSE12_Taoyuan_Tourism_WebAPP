using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.EditSpot
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
            String userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // 取得目前登入者user ID

            var tmp_publicSpot = _context.PublicSpot.SingleOrDefault(x => x.Id == publicSpot.Id);

            if (tmp_publicSpot != null)
            {
                _context.Entry(tmp_publicSpot).CurrentValues.SetValues(publicSpot);
                _context.SaveChanges(); 
            }

            return Json(new { message = publicSpot.Id });
        }
    }
}