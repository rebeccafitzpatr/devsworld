using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using devsworld.Data;
using devsworld.Services;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PracticeController : ControllerBase
{
    private readonly PracticeService _practiceService;
    private readonly UserManager<ApplicationUser> _userManager;

    public PracticeController(PracticeService practiceService, UserManager<ApplicationUser> userManager)
    {
        _practiceService = practiceService;
        _userManager = userManager;
    }

    // GET: api/practice/questions?difficulty=Easy
    [HttpGet("questions")]
    public async Task<ActionResult<List<DsaQuestion>>> GetQuestions([FromQuery] string difficulty = null)
    {
        var questions = await _practiceService.GetQuestionsAsync(difficulty);
        return Ok(questions);
    }

    // POST: api/practice/attempt
    public class AttemptDto
    {
        public int QuestionId { get; set; }
        public string UserSolution { get; set; }
    }

    [HttpPost("attempt")]
    public async Task<ActionResult<UserQuestionAttempt>> SubmitAttempt([FromBody] AttemptDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        var attempt = await _practiceService.SubmitAttemptAsync(user.Id, dto.QuestionId, dto.UserSolution);
        if (attempt == null) return NotFound();
        return Ok(attempt);
    }

    // GET: api/practice/progress
    [HttpGet("progress")]
    public async Task<ActionResult<UserProgressDto>> GetProgress()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        var progress = await _practiceService.GetUserProgressAsync(user.Id);
        return Ok(progress);
    }
}
