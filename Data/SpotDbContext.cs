using Microsoft.EntityFrameworkCore;
using NCUSE12_Taoyuan_Tourism_WebAPP.Models.Spot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NCUSE12_Taoyuan_Tourism_WebAPP.Data
{
    public class SpotDbContext : DbContext
    {
        public SpotDbContext(DbContextOptions<SpotDbContext> options)
    : base(options)
        {
        }

        public DbSet<PublicSpot> PublicSpot { get; set; }

        public DbSet<PrivateSpot> PrivateSpot { get; set; }


    }
}
