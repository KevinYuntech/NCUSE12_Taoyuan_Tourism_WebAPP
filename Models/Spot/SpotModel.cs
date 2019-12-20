using System.ComponentModel.DataAnnotations;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot
{
    public class SpotModel
    {
        public long Id { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "Name length can't be more than 50.")]
        public string Name { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "Address length can't be more than 8.")]
        public string Address { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "Address length can't be more than 8.")]
        public string Description { get; set; } 

        public string ImageDir { get; set; }
    }
}