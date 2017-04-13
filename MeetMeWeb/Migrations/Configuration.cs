namespace MeetMeWeb.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MeetMeWeb.MeetMeDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MeetMeWeb.MeetMeDbContext context)
        {
            //  This method will be called after migrating to the latest version.
        }
    }
}
