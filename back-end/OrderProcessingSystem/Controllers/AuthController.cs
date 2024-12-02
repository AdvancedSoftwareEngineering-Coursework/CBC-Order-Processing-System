namespace OrderProcessingSystem.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthManager _authManager;

    public AuthController(AuthManager authManager)
    {
        _authManager = authManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var result = await _authManager.RegisterAsync(registerDto);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Registration Successful");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var token = await _authManager.LoginAsync(loginDto);
        if (token == null)
            return Unauthorized("Invalid credentials");

        return Ok($"Login Successful{new { Token = token }}");
    }
}