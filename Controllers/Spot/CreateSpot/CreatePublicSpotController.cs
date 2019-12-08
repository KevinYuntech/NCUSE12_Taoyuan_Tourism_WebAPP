using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.CreateSpot
{
    public class CreatePublicSpotController : CreateSpotController
    {
    
        public CreatePublicSpotController(SpotDbContext context) : base(context)
        {
        }

        [HttpPost]
        public override IActionResult CreateSpotInfo(String name,String address)
        {

            var tmp = new PublicSpot();

            /*
            tmp.Name = spot.Name;
            tmp.Address = spot.Address;
            tmp.Description = spot.Description;
            tmp.ImageDir = spot.ImageDir;
            */
            tmp.Name = name;
            tmp.Address = address;
            this._context.PublicSpot.Add(tmp);
            this._context.SaveChanges();
            return Json(new { status = "success" });
        }
    }
}