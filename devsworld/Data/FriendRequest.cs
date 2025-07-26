public class FriendRequest
{
    public int Id { get; set; }
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string Status { get; set; } // "Pending", "Accepted", "Declined"
    public DateTime RequestedAt { get; set; }
}