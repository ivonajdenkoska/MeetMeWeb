using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MeetMeWeb.Startup))]

namespace MeetMeWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
