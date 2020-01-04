namespace NCUSE12_Taoyuan_Tourism_WebAPP.Models
{
    public class IndexModel
    {
        public bool RoleIsAdminStatus { get; set; }

        public IndexModel(bool RoleIsAdminStatus)
        {
            this.RoleIsAdminStatus = RoleIsAdminStatus;
        }
    }
}