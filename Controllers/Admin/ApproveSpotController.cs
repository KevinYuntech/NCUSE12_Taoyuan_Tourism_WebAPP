using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Admin
{
    public class ApproveSpotController: Controller
    {
        [Authorize(Roles="Admin")]
        public IActionResult ApproveSpotPage()
        {

            return View();
        }
    }
}