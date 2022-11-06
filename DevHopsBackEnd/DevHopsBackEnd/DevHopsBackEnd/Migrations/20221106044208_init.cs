using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevHopsBackEnd.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageData = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkItems",
                columns: table => new
                {
                    WorkItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Assignee = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Test = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkItems", x => x.WorkItemId);
                });

            migrationBuilder.CreateTable(
                name: "StatusUpdates",
                columns: table => new
                {
                    StatusUpdateId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UpdateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageId = table.Column<int>(type: "int", nullable: true),
                    WorkItemId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusUpdates", x => x.StatusUpdateId);
                    table.ForeignKey(
                        name: "FK_StatusUpdates_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StatusUpdates_WorkItems_WorkItemId",
                        column: x => x.WorkItemId,
                        principalTable: "WorkItems",
                        principalColumn: "WorkItemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StatusUpdates_ImageId",
                table: "StatusUpdates",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_StatusUpdates_WorkItemId",
                table: "StatusUpdates",
                column: "WorkItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StatusUpdates");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "WorkItems");
        }
    }
}
