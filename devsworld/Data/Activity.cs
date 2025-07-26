public class Activity
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string Type { get; set; } // e.g. "SolvedQuestion", "SentMessage"
    public string Description { get; set; }
    public DateTime Timestamp { get; set; }
}