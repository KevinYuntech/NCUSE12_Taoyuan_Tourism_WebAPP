using System;
using System.Collections;
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

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers
{
    public class AccountController : Controller
    {   
        protected SpotDbContext _context;
        
        public AccountController(SpotDbContext context)
        {
            this._context = context;
        }
        [HttpGet]
        public IActionResult GetLoginUser()
        {
            // 取得目前登入者user ID
            String user_Id = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Json(new { userId = user_Id });
        }

        [Authorize]
        [HttpGet]
        public IActionResult ViewUserValidSpotPage()
        {
            // 取得目前登入者user ID
            String user_Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
                //判斷郵遞區號session, 回傳該郵遞區號對應景點資料
                try
                {
                    IList<PublicSpot> result = this._context.PublicSpot.Where(x => x.UserId == user_Id).Where(x => x.ApprovedStatus == "審核成功").ToList();
                    var resultModel = new SpotListViewModel(true,"成功查詢一筆資料",result);
                    return View(resultModel);
                }
                catch (System.Exception)
                {
                    return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"查詢不到資料",null)) }); 
                    throw;
                }
        }
        
        [Authorize]
        [HttpGet]
        public IActionResult EditUserVaildSpotPage()
        {
            // 取得目前登入者user ID
            String user_Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
                //判斷郵遞區號session, 回傳該郵遞區號對應景點資料
                try
                {
                    IList<PublicSpot> result = this._context.PublicSpot.Where(x => x.UserId == user_Id).Where(x => x.ApprovedStatus == "審核成功").ToList();
                    var resultModel = new SpotListViewModel(true,"成功查詢一筆資料",result);
                    return View(resultModel);
                }
                catch (System.Exception)
                {
                    return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"查詢不到資料",null)) }); 
                    throw;
                }
        }

        [Authorize]
        [HttpGet]
        public IActionResult ViewUserPendingSpotPage()
        {
            // 取得目前登入者user ID
            String user_Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
                //判斷郵遞區號session, 回傳該郵遞區號對應景點資料
                try
                {
                    IList<PublicSpot> result = this._context.PublicSpot.Where(x => x.UserId == user_Id).Where(x => x.ApprovedStatus == "待審核").ToList();
                    var resultModel = new SpotListViewModel(true,"成功查詢一筆資料",result);
                    return View(resultModel);
                }
                catch (System.Exception)
                {
                    return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"查詢不到資料",null)) }); 
                    throw;
                }            
        }

        [Authorize]
        [HttpGet]
        public IActionResult ViewUserInvalidSpotPage()
        {
            // 取得目前登入者user ID
            String user_Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
                //判斷郵遞區號session, 回傳該郵遞區號對應景點資料
                try
                {
                    IList<PublicSpot> result = this._context.PublicSpot.Where(x => x.UserId == user_Id).Where(x => x.ApprovedStatus == "審核失敗").ToList();
                    var resultModel = new SpotListViewModel(true,"成功查詢一筆資料",result);
                    return View(resultModel);
                }
                catch (System.Exception)
                {
                    return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"查詢不到資料",null)) }); 
                    throw;
                }            
        }        
    }
}