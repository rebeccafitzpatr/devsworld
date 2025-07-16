using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace devsworld.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedSampleDsaQuestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "DsaQuestions",
                columns: new[] { "Id", "Description", "Difficulty", "Solution", "Title" },
                values: new object[,]
                {
                    { 1, "Write a function to reverse a string.", "Easy", "Use two pointers or built-in reverse.", "Reverse a String" },
                    { 2, "Find the maximum element in an array.", "Easy", "Iterate and compare elements.", "Find Maximum Element" },
                    { 3, "Check if a string is a palindrome.", "Medium", "Compare characters from both ends.", "Check Palindrome" },
                    { 4, "Given an array and a target, find two numbers that add up to the target.", "Medium", "Use a hash map to store complements.", "Two Sum" },
                    { 5, "Merge overlapping intervals.", "Hard", "Sort intervals and merge if overlapping.", "Merge Intervals" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DsaQuestions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DsaQuestions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "DsaQuestions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "DsaQuestions",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "DsaQuestions",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
