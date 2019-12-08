using Microsoft.EntityFrameworkCore;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models;

namespace MvcMovie.Data
{
    public class PublicSpotDbContext : DbContext
    {
        public PublicSpotDbContext (DbContextOptions<PublicSpotDbContext> options)
            : base(options)
        {
        }

        public DbSet<PublicSpot> PublicSpot { get; set; }


    }
}