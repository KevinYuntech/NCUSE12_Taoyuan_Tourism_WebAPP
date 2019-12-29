using System;
using System.ComponentModel.DataAnnotations;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot
{
    public class PublicSpot
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(21, ErrorMessage = "Name length can't be more than 50.")]
        public string Name { get; set; }

       
        [StringLength(1165, ErrorMessage = "Description length can't be more than 8.")]
        public string Description { get; set; } 

        [Required]
        [StringLength(45, ErrorMessage = "Address length can't be more than 8.")]
        public string Address { get; set; }

        [Required]
        public int Zipcode { get; set; } 
        [Required]
        public String Opentime { get; set; } 

        public String Image { get; set; } 


        public String UserId { get; set; }
    }
}
