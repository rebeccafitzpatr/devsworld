using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using devsworld.Data;

public class ProfileModel : PageModel
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileModel(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [BindProperty]
    public ApplicationUser CurrentUser { get; set; }

    public async Task<IActionResult> OnGetAsync()
    {
        CurrentUser = await _userManager.GetUserAsync(User);
        if (CurrentUser == null)
        {
            return RedirectToPage("/Account/Login");
        }
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return RedirectToPage("/Account/Login");
        }

        user.Bio = CurrentUser.Bio;
        // XP is usually updated by solving problems, but you can allow editing if needed
        user.XP = CurrentUser.XP;

        await _userManager.UpdateAsync(user);
        return RedirectToPage();
    }
}