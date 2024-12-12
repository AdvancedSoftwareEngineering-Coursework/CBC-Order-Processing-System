namespace OrderProcessingSystem.Managers;
public class AuthManager
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;

    public AuthManager(UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<IdentityResult> RegisterAsync(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Username,
            Email = registerDto.Email,
        };
        
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Customer");
        }
        return result;
    }

    public async Task<string?> LoginAsync(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return null;

        // Generate JWT token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
            [
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
            ]),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}