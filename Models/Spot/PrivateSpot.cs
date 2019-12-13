using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot
{
    public class PrivateSpot
    {

        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public string Description { get; set; }

        public string ImageDir { get; set; }
    }
}
