using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('ABS')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('GPS')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Sunroof')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Self Drive')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Automatic Shift')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Features WHERE Name IN ('ABS', 'GPS', 'Sunroof', 'Self Drive', 'Automatic Shift')");
        }
    }
}
