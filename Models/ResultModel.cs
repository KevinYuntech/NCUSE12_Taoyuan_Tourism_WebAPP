using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models
{
    public class ResultModel
    {
        public bool Succ { get; set; }

        public String StatusMessage{get;set;}
        public Object Data{get;set;}
        public DateTime DataTime { get; set; }

        public ResultModel(Boolean Succ,String StatusMessage,Object Data)
        {
            this.Succ = Succ;
            this.StatusMessage =StatusMessage;
            this.Data = Data;
            DataTime = DateTime.Now;
        }
    }
}
