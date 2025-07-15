using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using devsworld.Data;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<ApplicationUser>> GetProfile()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        return Ok(new { user.UserName, user.Email, user.Bio, user.XP });
    }

    [HttpPost]
    public async Task<IActionResult> UpdateProfile([FromBody] ApplicationUser updated)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        user.Bio = updated.Bio;
        user.XP = updated.XP;
        await _userManager.UpdateAsync(user);
        return Ok();
    }
}