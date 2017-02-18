namespace MeetMeWeb
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using MeetMeWeb.Models;

    public class MeetMeDbContext : DbContext
    {
        public MeetMeDbContext()
            : base("name=MeetMeDB")
        {
        }

        public DbSet<User> Users { get; set; }
    }
}