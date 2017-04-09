namespace MeetMeWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEvent : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Events", new[] { "user_Id" });
            DropPrimaryKey("dbo.Events");
            AddColumn("dbo.Events", "ID", c => c.Guid(nullable: false, identity: true));
            AddColumn("dbo.Events", "Name", c => c.String(nullable: false));
            AddColumn("dbo.Events", "Location", c => c.String());
            AddColumn("dbo.Events", "Start", c => c.DateTime(nullable: false));
            AddColumn("dbo.Events", "End", c => c.DateTime(nullable: false));
            AddColumn("dbo.Events", "Priority", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Events", "ID");
            CreateIndex("dbo.Events", "User_Id");
            DropColumn("dbo.Events", "eventID");
            DropColumn("dbo.Events", "eventName");
            DropColumn("dbo.Events", "eventLocation");
            DropColumn("dbo.Events", "eventStart");
            DropColumn("dbo.Events", "eventEnd");
            DropColumn("dbo.Events", "eventPriority");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Events", "eventPriority", c => c.String());
            AddColumn("dbo.Events", "eventEnd", c => c.String());
            AddColumn("dbo.Events", "eventStart", c => c.String());
            AddColumn("dbo.Events", "eventLocation", c => c.String());
            AddColumn("dbo.Events", "eventName", c => c.String());
            AddColumn("dbo.Events", "eventID", c => c.Guid(nullable: false, identity: true));
            DropIndex("dbo.Events", new[] { "User_Id" });
            DropPrimaryKey("dbo.Events");
            DropColumn("dbo.Events", "Priority");
            DropColumn("dbo.Events", "End");
            DropColumn("dbo.Events", "Start");
            DropColumn("dbo.Events", "Location");
            DropColumn("dbo.Events", "Name");
            DropColumn("dbo.Events", "ID");
            AddPrimaryKey("dbo.Events", "eventID");
            CreateIndex("dbo.Events", "user_Id");
        }
    }
}
