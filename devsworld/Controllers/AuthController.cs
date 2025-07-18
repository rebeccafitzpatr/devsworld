using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using devsworld.Data;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userManager.FindByNameAsync(dto.UserName);
        if (user == null) return Unauthorized();

        var result = await _signInManager.PasswordSignInAsync(dto.UserName, dto.Password, false, false);
        if (result.Succeeded) return Ok();
        return Unauthorized();
    }

}

public class LoginDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
}