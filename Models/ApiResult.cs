using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models
{
    public class ApiResult
    {
        /// <summary>
        /// 執行成功與否
        /// </summary>
        public bool Succ { get; set; }
        /// <summary>
        /// 結果代碼(0000=成功，其餘為錯誤代號)
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 錯誤訊息
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 資料時間
        /// </summary>
        public DateTime DataTime { get; set; }
        /// <summary>
        /// 資料本體
        /// </summary>

        public ApiResult()
        {
            Code = "0000";
            Succ = true;
            DataTime = DateTime.Now;
        }
    }
}
