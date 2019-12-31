using System.Reflection.Metadata.Ecma335;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;
using System.IO;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot
{
    public  class SearchSpotController : Controller
    {
        protected SpotDbContext _context;
        private readonly static Dictionary<string, string> _contentTypes = new Dictionary<string, string>
        {
            {".png", "image/png"},
            {".jpg", "image/jpeg"},
            {".jpeg", "image/jpeg"},
            {".gif", "image/gif"}
        };

        public SearchSpotController(SpotDbContext context)
        {
            this._context = context;
        }

        //區域景點清單
        [HttpGet]
        public IActionResult SearchSpotPageByDistrict(int Zipcode,string Zone)
        {   
            try
            {
                HttpContext.Session.SetInt32("Zipcode", Zipcode);
                HttpContext.Session.SetString("Zone", Zone);
                return View();
            }
            catch (System.Exception)
            {
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"查詢不到資料",null)) });  
                throw;
            }
        }
        
        [HttpGet]
        public  IActionResult SearchSpotByDistrictSession()
        {
                //判斷郵遞區號session, 回傳該郵遞區號對應景點資料
                try
                {
                    var Zipcode = HttpContext.Session.GetInt32("Zipcode");
                    var Zone = HttpContext.Session.GetString("Zone");
                    IList result = this._context.PublicSpot.Where(x => x.Zipcode == Zipcode).ToList();
                    return Json(new { message = JsonConvert.SerializeObject(new ResultModel(true,"成功查詢一到多筆資料",result)),Zone = Zone }); 
                }
                catch (System.Exception)
                {
                    return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"查詢不到資料",null)) }); 
                    throw;
                }
        }

        [HttpGet]
        public  IActionResult SearchSpotByDistrict(String zipcode)
        {
            //判斷郵遞區號, 回傳該郵遞區號對應景點資料
            IList result = this._context.PublicSpot.Where(x => x.Name == zipcode).ToList();

            if(result.Count != 0){
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(true,"成功查詢一到多筆資料",result)) });
            }
            else{
                return Json(new { message = JsonConvert.SerializeObject(new ResultModel(false,"找不到任何資料",null)) });
            }
            
        }
        
        //詳細景點頁面
        [HttpGet]
        public  IActionResult SearchSpotPageById(int Id)
        {
            //判斷景點id, 回傳該id對應景點資料
            var result = this._context.PublicSpot.SingleOrDefault(x => x.Id == Id);

            if(result != null){

                List<PublicSpot> list= new List<PublicSpot>();
                list.Add(result);
                var resultModel = new SpotListViewModel(true,"成功查詢一筆資料",list);
                return View(resultModel);
            }
            else{
                List<PublicSpot> list= new List<PublicSpot>();
                var resultModel =  new SpotListViewModel(false,"找不到任何資料",list);
                return View(resultModel);
            }

        }

        
        [HttpGet]
        public  IActionResult SearchImageByName(String fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return NotFound();
            }
            else
            {
                var path = "wwwroot\\Img\\SpotImg\\" + fileName;
                var memoryStream = new MemoryStream();
                using (var stream = new FileStream(path, FileMode.Open))
                {
                     stream.CopyToAsync(memoryStream);
                }
                memoryStream.Seek(0, SeekOrigin.Begin);

                // 回傳檔案到 Client 需要附上 Content Type，否則瀏覽器會解析失敗。
                return new FileStreamResult(memoryStream, _contentTypes[Path.GetExtension(path).ToLowerInvariant()]);
            }
        }
        

    }
}