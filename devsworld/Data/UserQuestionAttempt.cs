public class UserQuestionAttempt
{
    public int Id { get; set; }
    public string ApplicationUserId { get; set; }
    public int DsaQuestionId { get; set; }
    public DateTime AttemptedAt { get; set; }
    public bool IsCorrect { get; set; }
    public string UserSolution { get; set; }
}