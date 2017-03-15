using MeetMeWeb.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MeetMeWeb
{

    public class MeetMeDbContext : IdentityDbContext<User>
    {
        public MeetMeDbContext()
            : base("name=MeetMeDB")
        {
        }

        public static MeetMeDbContext Create()
        {
            return new MeetMeDbContext();
        }
    }
}