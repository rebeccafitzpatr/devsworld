using devsworld.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace devsworld.Services
{
    public class PracticeService
    {
        private readonly ApplicationDbContext _context;
        public PracticeService(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Get a list of questions (optionally filter by difficulty)
        public async Task<List<DsaQuestion>> GetQuestionsAsync(string difficulty = null)
        {
            var query = _context.DsaQuestions.AsQueryable();
            if (!string.IsNullOrEmpty(difficulty))
                query = query.Where(q => q.Difficulty == difficulty);
            return await query.ToListAsync();
        }

        // 2. Submit an attempt and record it
        public async Task<UserQuestionAttempt> SubmitAttemptAsync(string userId, int questionId, string userSolution)
        {
            var question = await _context.DsaQuestions.FindAsync(questionId);
            if (question == null) return null;

            bool isCorrect = string.Equals(userSolution?.Trim(), question.Solution?.Trim(), StringComparison.OrdinalIgnoreCase);

            var attempt = new UserQuestionAttempt
            {
                ApplicationUserId = userId,
                DsaQuestionId = questionId,
                AttemptedAt = DateTime.UtcNow,
                IsCorrect = isCorrect,
                UserSolution = userSolution
            };
            _context.UserQuestionAttempts.Add(attempt);

            // Record activity for any attempt
            var activity = new Activity
            {
                UserId = userId,
                Type = isCorrect ? "SolvedQuestion" : "AttemptedQuestion",
                Description = isCorrect
                    ? $"Solved '{question.Title}'"
                    : $"Attempted '{question.Title}'",
                Timestamp = DateTime.UtcNow
            };
            _context.Activities.Add(activity);

            await _context.SaveChangesAsync();
            return attempt;
        }

        // 3. Get user progress (number solved, attempted, etc.)
        public async Task<UserProgressDto> GetUserProgressAsync(string userId)
        {
            var attempts = await _context.UserQuestionAttempts
                .Where(a => a.ApplicationUserId == userId)
                .ToListAsync();
            int solved = attempts.Count(a => a.IsCorrect);
            int attempted = attempts.Count;
            return new UserProgressDto { Attempted = attempted, Solved = solved };
        }
    }
}

// Move UserProgressDto to top-level for easier access
namespace devsworld.Services    
{
    public class UserProgressDto
    {
        public int Attempted { get; set; }
        public int Solved { get; set; }
    }
}