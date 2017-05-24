namespace MeetMeWeb.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Connection : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ConnectionNotifications",
                c => new
                    {
                        ID = c.Guid(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.Connections",
                c => new
                {
                    ID = c.Guid(nullable: false, identity: true),
                })
                .PrimaryKey(t => t.ID);

        }
        
        public override void Down()
        {
            DropTable("dbo.ConnectionNotifications");
            DropTable("dbo.Connections");
        }
    }
}
