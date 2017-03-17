using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;
using System.Data.Entity;
using MeetMeWeb.Migrations;
using MeetMeWeb.App_Start;

namespace MeetMeWeb
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //GlobalFilters.Filters.Add(new RequireHttpsAttribute());
            // Database 
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MeetMeDbContext, Configuration>());
        }
    }
}