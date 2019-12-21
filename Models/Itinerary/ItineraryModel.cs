using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models.Itinerary
{
    public class ItineraryModel
    {
        private List<SpotModel> TmpItineraryList = new List<SpotModel>();

        public void add(SpotModel spotModel)
        {
            this.TmpItineraryList.Add(spotModel);
        }

        public int GetListCount()
        {
            return this.TmpItineraryList.Count;
        }

    }
}
