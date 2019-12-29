using System;
using System.ComponentModel.DataAnnotations;


namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models.Itinerary
{
    public class ItineraryModel
    {
        [Required]
        public int Spot_Id { get; set; }
    }
}