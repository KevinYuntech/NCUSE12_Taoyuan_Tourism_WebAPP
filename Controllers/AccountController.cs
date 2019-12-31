using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult GetLoginUser()
        {
            // 取得目前登入者user ID
            String user_Id = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Json(new { userId = user_Id });
        }

        [HttpGet]
        public IActionResult ViewUserSpot()
        {
            // 取得目前登入者user ID
            String user_Id = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Json(new { userId = user_Id });
        }
    }
}