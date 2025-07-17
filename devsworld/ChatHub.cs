using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    public async Task JoinQuestionRoom(string questionId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"question-{questionId}");
    }

    public async Task SendMessage(string questionId, string user, string message)
    {
        await Clients.Group($"question-{questionId}").SendAsync("ReceiveMessage", user, message);
    }
}