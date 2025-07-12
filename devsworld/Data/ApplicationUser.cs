using Microsoft.AspNetCore.Identity;

public class  ApplicationUser : IdentityUser
{
    public int XP { get; set; }
    public string Bio { get; set; }

}