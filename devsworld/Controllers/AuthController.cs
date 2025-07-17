using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using devsworld.Data;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowReactApp")]
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

    [HttpOptions("login")]
    public IActionResult PreflightRoute()
    {
        Response.Headers.Add("Access-Control-Allow-Origin", "https://polite-meadow-073938f00.1.azurestaticapps.net");
        Response.Headers.Add("Access-Control-Allow-Methods", "POST,OPTIONS");
        Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,Accept");
        Response.Headers.Add("Access-Control-Allow-Credentials", "true");
        return Ok();
    }
}

public class LoginDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
}