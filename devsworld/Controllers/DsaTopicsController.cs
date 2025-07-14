using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using devsworld.Data;

[ApiController]
[Route("api/[controller]")]
public class DsaTopicsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public DsaTopicsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<DsaTopic>> GetTopics()
    {
        return await _context.DsaTopics.ToListAsync();
    }
}