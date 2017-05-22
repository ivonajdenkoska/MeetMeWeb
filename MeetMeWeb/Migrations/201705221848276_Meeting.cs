namespace MeetMeWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Meeting : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Meetings",
                c => new
                    {
                        ID = c.Guid(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Location = c.String(),
                        Start = c.DateTime(nullable: false),
                        End = c.DateTime(nullable: false),
                        Priority = c.Int(nullable: false),
                        creator_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.AspNetUsers", t => t.creator_Id)
                .Index(t => t.creator_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Meetings", "creator_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Meetings", new[] { "creator_Id" });
            DropTable("dbo.Meetings");
        }
    }
}
