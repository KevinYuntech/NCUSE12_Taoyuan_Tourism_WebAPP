using System;
using Microsoft.AspNetCore.Mvc;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Controllers.Spot.CreateSpot
{
    using Microsoft.AspNetCore.Authorization;
    using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;


   
    public class CreatePublicSpotController : CreateSpotController
    {
    
        public CreatePublicSpotController(SpotDbContext context) : base(context)
        {
        }

        [HttpPost]
        public override IActionResult CreateSpotInfo(SpotModel spotModel)
        {

            var publicSpot = new PublicSpot();
            publicSpot.Name = spotModel.Name;
            publicSpot.Address = spotModel.Address;
            this._context.PublicSpot.Add(publicSpot);
            this._context.SaveChanges();

           
            return Json(new { status = "success" });
        }
    }
}