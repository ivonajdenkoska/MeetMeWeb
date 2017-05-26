namespace MeetMeWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MeetingRequests : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MeetingRequests",
                c => new
                    {
                        ID = c.Guid(nullable: false, identity: true),
                        Content = c.String(),
                        Status = c.Boolean(nullable: false),
                        Meeting_ID = c.Guid(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Meetings", t => t.Meeting_ID)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.Meeting_ID)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MeetingRequests", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.MeetingRequests", "Meeting_ID", "dbo.Meetings");
            DropIndex("dbo.MeetingRequests", new[] { "User_Id" });
            DropIndex("dbo.MeetingRequests", new[] { "Meeting_ID" });
            DropTable("dbo.MeetingRequests");
        }
    }
}
