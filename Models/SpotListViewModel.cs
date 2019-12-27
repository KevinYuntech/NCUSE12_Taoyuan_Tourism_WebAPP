using System.Collections;
using System;
using System.Collections.Generic;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;


namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models
{
    public class SpotListViewModel
    {
        public bool Status { get; set; }

        public string StatusMessage{get;set;}
        public IList<PublicSpot> Data{get;set;}
        public DateTime DataTime { get; set; }

        public SpotListViewModel(Boolean Status,String StatusMessage,IList<PublicSpot> Data)
        {
            this.Status = Status;
            this.StatusMessage =StatusMessage;
            this.Data = Data;
            DataTime = DateTime.Now;
        }
    }
}