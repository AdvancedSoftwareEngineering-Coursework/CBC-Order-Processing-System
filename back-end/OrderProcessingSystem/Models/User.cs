namespace OrderProcessingSystem.Models
{
    public class User   
    {
        public int Id { get; set; } // Unique identifier
        public string Username { get; set; } // Username for login
        public string PasswordHash { get; set; } // Hashed password (for security)
        public string Email { get; set; } // User's email, used for notifications or login
        public int RoleId { get; set; }
        public Role Role { get; set; } // Roles to manage permissions (e.g., Admin, User)
        public DateTime Created { get; set; } // Date of account creation
    }
}