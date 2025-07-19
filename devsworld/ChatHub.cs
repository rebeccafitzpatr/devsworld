using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using devsworld.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

public class ChatHub : Hub
{
    private readonly ApplicationDbContext _context;

    public ChatHub(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task JoinQuestionRoom(string questionId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"question-{questionId}");
    }

    public async Task SendMessage(string questionId, string user, string message)
    {
        // Persist the message
        var chatMessage = new ChatMessage
        {
            QuestionId = questionId,
            User = user,
            Message = message,
            SentAt = DateTime.UtcNow
        };
        _context.ChatMessages.Add(chatMessage);
        await _context.SaveChangesAsync();

        await Clients.Group($"question-{questionId}").SendAsync("ReceiveMessage", user, message);
    }

    public async Task<List<ChatMessage>> GetMessages(string questionId)
    {
        return await _context.ChatMessages
            .Where(m => m.QuestionId == questionId)
            .OrderBy(m => m.SentAt)
            .ToListAsync();
    }
}