namespace MeetMeWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fix : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Events", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Events", new[] { "User_Id" });
            AlterColumn("dbo.Events", "User_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Events", "User_Id");
            AddForeignKey("dbo.Events", "User_Id", "dbo.AspNetUsers", "Id");
            DropTable("dbo.Connections");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Connections",
                c => new
                    {
                        ID = c.Guid(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.ID);
            
            DropForeignKey("dbo.Events", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Events", new[] { "User_Id" });
            AlterColumn("dbo.Events", "User_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Events", "User_Id");
            AddForeignKey("dbo.Events", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
