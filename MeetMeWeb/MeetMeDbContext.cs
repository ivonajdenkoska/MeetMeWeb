using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using MeetMeWeb.Models;

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