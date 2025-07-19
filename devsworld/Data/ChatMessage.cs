public class ChatMessage
{
	public int Id { get; set; }
	public string QuestionId { get; set; }
	public string User { get; set; }
	public string Message { get; set; }
	public DateTime SentAt { get; set; }
}