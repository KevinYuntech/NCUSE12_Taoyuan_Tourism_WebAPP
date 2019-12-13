using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NCUSE12_Taoyuan_Tourism_WebAPP.Data;

[assembly: HostingStartup(typeof(NCUSE12_Taoyuan_Tourism_WebAPP.Areas.Identity.IdentityHostingStartup))]
namespace NCUSE12_Taoyuan_Tourism_WebAPP.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}