namespace MeetMeWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Event_flag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Events", "flag", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Events", "flag");
        }
    }
}
