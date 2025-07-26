using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using devsworld.Data;
using System.Threading.Tasks;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FriendsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public FriendsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    // DTOs
    public class FriendRequestDto
    {
        public string ReceiverId { get; set; }
    }

    public class RespondFriendRequestDto
    {
        public int RequestId { get; set; }
        public string Response { get; set; } // "Accepted" or "Declined"
    }

    public class DirectMessageDto
    {
        public string ReceiverId { get; set; }
        public string Content { get; set; }
    }

    // POST: api/friends/request
    [HttpPost("request")]
    public async Task<IActionResult> SendFriendRequest([FromBody] FriendRequestDto dto)
    {
        var sender = await _userManager.GetUserAsync(User);
        if (sender == null) return Unauthorized();

        if (sender.Id == dto.ReceiverId)
            return BadRequest("Cannot send friend request to yourself.");

        // Prevent duplicate requests
        var existing = await _context.FriendRequests
            .FirstOrDefaultAsync(fr => fr.SenderId == sender.Id && fr.ReceiverId == dto.ReceiverId && fr.Status == "Pending");
        if (existing != null)
            return BadRequest("Friend request already sent.");

        // Prevent if already friends
        var alreadyFriends = await _context.Friendships
            .AnyAsync(f => (f.UserAId == sender.Id && f.UserBId == dto.ReceiverId) || (f.UserAId == dto.ReceiverId && f.UserBId == sender.Id));
        if (alreadyFriends)
            return BadRequest("Already friends.");

        var request = new FriendRequest
        {
            SenderId = sender.Id,
            ReceiverId = dto.ReceiverId,
            Status = "Pending",
            RequestedAt = DateTime.UtcNow
        };
        _context.FriendRequests.Add(request);
        await _context.SaveChangesAsync();
        return Ok();
    }

    // POST: api/friends/respond
    [HttpPost("respond")]
    public async Task<IActionResult> RespondToRequest([FromBody] RespondFriendRequestDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var request = await _context.FriendRequests.FindAsync(dto.RequestId);
        if (request == null || request.ReceiverId != user.Id || request.Status != "Pending")
            return BadRequest("Invalid request.");

        request.Status = dto.Response;
        if (dto.Response == "Accepted")
        {
            var friendship = new Friendship
            {
                UserAId = request.SenderId,
                UserBId = request.ReceiverId,
                FriendsSince = DateTime.UtcNow
            };
            _context.Friendships.Add(friendship);
        }
        await _context.SaveChangesAsync();
        return Ok();
    }

    // GET: api/friends/list
    [HttpGet("list")]
    public async Task<IActionResult> GetFriends()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var friends = await _context.Friendships
            .Where(f => f.UserAId == user.Id || f.UserBId == user.Id)
            .Select(f => f.UserAId == user.Id ? f.UserBId : f.UserAId)
            .ToListAsync();

        var friendProfiles = await _context.Users
            .Where(u => friends.Contains(u.Id))
            .Select(u => new { u.Id, u.UserName, u.Email })
            .ToListAsync();

        return Ok(friendProfiles);
    }

    // DELETE: api/friends/{friendId}
    [HttpDelete("{friendId}")]
    public async Task<IActionResult> RemoveFriend(string friendId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var friendship = await _context.Friendships
            .FirstOrDefaultAsync(f => (f.UserAId == user.Id && f.UserBId == friendId) || (f.UserAId == friendId && f.UserBId == user.Id));
        if (friendship == null)
            return NotFound();

        _context.Friendships.Remove(friendship);
        await _context.SaveChangesAsync();
        return Ok();
    }

    // POST: api/friends/message
    [HttpPost("message")]
    public async Task<IActionResult> SendDirectMessage([FromBody] DirectMessageDto dto)
    {
        var sender = await _userManager.GetUserAsync(User);
        if (sender == null) return Unauthorized();

        // Only allow messaging between friends
        var areFriends = await _context.Friendships
            .AnyAsync(f => (f.UserAId == sender.Id && f.UserBId == dto.ReceiverId) || (f.UserAId == dto.ReceiverId && f.UserBId == sender.Id));
        if (!areFriends)
            return BadRequest("You can only message your friends.");

        var message = new DirectMessage
        {
            SenderId = sender.Id,
            ReceiverId = dto.ReceiverId,
            Content = dto.Content,
            SentAt = DateTime.UtcNow
        };
        _context.DirectMessages.Add(message);
        await _context.SaveChangesAsync();
        return Ok();
    }

    // GET: api/friends/messages/{friendId}
    [HttpGet("messages/{friendId}")]
    public async Task<IActionResult> GetDirectMessages(string friendId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        // Only allow viewing messages between friends
        var areFriends = await _context.Friendships
            .AnyAsync(f => (f.UserAId == user.Id && f.UserBId == friendId) || (f.UserAId == friendId && f.UserBId == user.Id));
        if (!areFriends)
            return BadRequest("You can only view messages with your friends.");

        var messages = await _context.DirectMessages
            .Where(m => (m.SenderId == user.Id && m.ReceiverId == friendId) || (m.SenderId == friendId && m.ReceiverId == user.Id))
            .OrderBy(m => m.SentAt)
            .Select(m => new { m.SenderId, m.ReceiverId, m.Content, m.SentAt })
            .ToListAsync();

        return Ok(messages);
    }

    // GET: api/friends/activity
    [HttpGet("activity")]
    public async Task<IActionResult> GetActivityFeed()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var friends = await _context.Friendships
            .Where(f => f.UserAId == user.Id || f.UserBId == user.Id)
            .Select(f => f.UserAId == user.Id ? f.UserBId : f.UserAId)
            .ToListAsync();

        var activities = await _context.Activities
            .Where(a => friends.Contains(a.UserId))
            .OrderByDescending(a => a.Timestamp)
            .Take(50)
            .ToListAsync();

        return Ok(activities);
    }

    // GET: api/friends/search?query=someusername
    [HttpGet("search")]
    public async Task<IActionResult> SearchUsers([FromQuery] string query)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        if (string.IsNullOrWhiteSpace(query))
            return BadRequest("Query is required.");

        // Search by username or email, exclude self
        var users = await _context.Users
            .Where(u => (u.UserName.Contains(query) || u.Email.Contains(query)) && u.Id != user.Id)
            .Select(u => new { u.Id, u.UserName, u.Email })
            .Take(20)
            .ToListAsync();

        return Ok(users);
    }

    // GET: api/friends/requests
    [HttpGet("requests")]
    public async Task<IActionResult> GetIncomingRequests()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var requests = await _context.FriendRequests
            .Where(r => r.ReceiverId == user.Id && r.Status == "Pending")
            .Join(_context.Users, r => r.SenderId, u => u.Id, (r, u) => new {
                r.Id,
                SenderId = r.SenderId,
                SenderUserName = u.UserName,
                r.RequestedAt
            })
            .ToListAsync();

        return Ok(requests);
    }

    // GET: api/friends/profile/{friendId}
    [HttpGet("profile/{friendId}")]
    public async Task<IActionResult> GetFriendProfile(string friendId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        // Only allow viewing profiles of friends
        var areFriends = await _context.Friendships
            .AnyAsync(f => (f.UserAId == user.Id && f.UserBId == friendId) || (f.UserAId == friendId && f.UserBId == user.Id));
        if (!areFriends)
            return BadRequest("You can only view profiles of your friends.");

        var friend = await _context.Users
            .Where(u => u.Id == friendId)
            .Select(u => new { u.Id, u.UserName, u.Email, u.Bio, u.XP })
            .FirstOrDefaultAsync();

        if (friend == null)
            return NotFound();

        return Ok(friend);
    }

    // POST: api/friends/post
    [HttpPost("post")]
    public async Task<IActionResult> CreatePost([FromBody] string content)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var post = new Post
        {
            UserId = user.Id,
            Content = content,
            CreatedAt = DateTime.UtcNow
        };
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return Ok();
    }

    // GET: api/friends/feed
    [HttpGet("feed")]
    public async Task<IActionResult> GetFriendsFeed()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var friends = await _context.Friendships
            .Where(f => f.UserAId == user.Id || f.UserBId == user.Id)
            .Select(f => f.UserAId == user.Id ? f.UserBId : f.UserAId)
            .ToListAsync();

        var posts = await _context.Posts
            .Where(p => friends.Contains(p.UserId) || p.UserId == user.Id)
            .OrderByDescending(p => p.CreatedAt)
            .Take(50)
            .ToListAsync();

        return Ok(posts);
    }
}