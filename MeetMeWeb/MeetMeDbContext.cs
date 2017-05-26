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

        public DbSet<Event> Events { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<ConnectionNotification> ConnectionNotifications { get; set; }
        public DbSet<MeetingRequest> MeetingRequests { get; set; }
    }
}