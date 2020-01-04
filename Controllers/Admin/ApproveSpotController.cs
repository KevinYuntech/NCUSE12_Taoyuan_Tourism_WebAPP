
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;
using Newtonsoft.Json;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Admin
{
    [Authorize(Roles="Admin")]
    public class ApproveSpotController: Controller
    {
        private readonly SpotDbContext _context;

        public ApproveSpotController(SpotDbContext context)
        {
            this._context = context;
        }

        
        [HttpGet]
        public IActionResult ApproveSpotPage()
        {
                IList<PublicSpot> result = this._context.PublicSpot.Where(x => x.ApprovedStatus == "待審核").ToList();
                var resultModel = new SpotListViewModel(true,"成功查詢一筆資料",result);
                return View(resultModel);                
        }

        [HttpPut]
        public IActionResult ApproveSpot(PublicSpot publicSpot)
        {       
            try
            {
                var result = this._context.PublicSpot.SingleOrDefault(x => x.Id == publicSpot.Id);
                this._context.SaveChanges();

                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(true,"修改狀態成功",result)) });                    
            }
            catch (System.Exception)
            {
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"修改狀態失敗",null)) });
                throw;
            }
            
        }

    }
}