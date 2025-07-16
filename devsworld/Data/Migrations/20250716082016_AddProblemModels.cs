using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace devsworld.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProblemModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DsaQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Difficulty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Solution = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DsaQuestions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserQuestionAttempts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DsaQuestionId = table.Column<int>(type: "int", nullable: false),
                    AttemptedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    UserSolution = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserQuestionAttempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserQuestionAttempts_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserQuestionAttempts_DsaQuestions_DsaQuestionId",
                        column: x => x.DsaQuestionId,
                        principalTable: "DsaQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserQuestionAttempts_ApplicationUserId",
                table: "UserQuestionAttempts",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserQuestionAttempts_DsaQuestionId",
                table: "UserQuestionAttempts",
                column: "DsaQuestionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserQuestionAttempts");

            migrationBuilder.DropTable(
                name: "DsaQuestions");
        }
    }
}
