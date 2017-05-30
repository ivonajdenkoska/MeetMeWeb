namespace MeetMeWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MR_Event_Relation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Events", "MR_ID", c => c.Guid());
            CreateIndex("dbo.Events", "MR_ID");
            AddForeignKey("dbo.Events", "MR_ID", "dbo.MeetingRequests", "ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Events", "MR_ID", "dbo.MeetingRequests");
            DropIndex("dbo.Events", new[] { "MR_ID" });
            DropColumn("dbo.Events", "MR_ID");
        }
    }
}
