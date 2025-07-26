using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace devsworld.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<DsaTopic> DsaTopics { get; set; }
        public DbSet<DsaQuestion> DsaQuestions { get; set; } // Added for practice problems
        public DbSet<UserQuestionAttempt> UserQuestionAttempts { get; set; } // Added for user attempts
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<DirectMessage> DirectMessages { get; set; }
		public DbSet<Post> Posts { get; set; }
		public DbSet<ChatMessage> ChatMessages { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DsaTopic>().HasData(
                new DsaTopic { Id = 1, Name = "What are Algorithms?", Overview = "An algorithm is a step-by-step procedure to solve a problem or perform a computation." },
                new DsaTopic { Id = 2, Name = "What is Big O Notation?", Overview = "Big O notation describes the upper bound of the time complexity of an algorithm as the input size grows." },
                new DsaTopic { Id = 3, Name = "Why Analyze Algorithms?", Overview = "Analyzing algorithms helps us understand their efficiency and scalability." }
            );

            // Seed sample DsaQuestions
            builder.Entity<DsaQuestion>().HasData(
                new DsaQuestion { Id = 1, Title = "Reverse a String", Description = "Write a function to reverse a string.", Difficulty = "Easy", Solution = "Use two pointers or built-in reverse." },
                new DsaQuestion { Id = 2, Title = "Find Maximum Element", Description = "Find the maximum element in an array.", Difficulty = "Easy", Solution = "Iterate and compare elements." },
                new DsaQuestion { Id = 3, Title = "Check Palindrome", Description = "Check if a string is a palindrome.", Difficulty = "Medium", Solution = "Compare characters from both ends." },
                new DsaQuestion { Id = 4, Title = "Two Sum", Description = "Given an array and a target, find two numbers that add up to the target.", Difficulty = "Medium", Solution = "Use a hash map to store complements." },
                new DsaQuestion { Id = 5, Title = "Merge Intervals", Description = "Merge overlapping intervals.", Difficulty = "Hard", Solution = "Sort intervals and merge if overlapping." }
            );

            // Optional: Configure relationships for UserQuestionAttempt
            builder.Entity<UserQuestionAttempt>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(u => u.ApplicationUserId)    
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserQuestionAttempt>()
                .HasOne<DsaQuestion>()
                .WithMany()
                .HasForeignKey(u => u.DsaQuestionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
