using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace devsworld.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedDsaTopics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "DsaTopics",
                columns: new[] { "Id", "Name", "Overview" },
                values: new object[,]
                {
                    { 1, "What are Algorithms?", "An algorithm is a step-by-step procedure to solve a problem or perform a computation." },
                    { 2, "What is Big O Notation?", "Big O notation describes the upper bound of the time complexity of an algorithm as the input size grows." },
                    { 3, "Why Analyze Algorithms?", "Analyzing algorithms helps us understand their efficiency and scalability." }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DsaTopics",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DsaTopics",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "DsaTopics",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
