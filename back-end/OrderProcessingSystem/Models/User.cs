namespace OrderProcessingSystem.Models;
public class User : IdentityUser
{
    public DateTime Created { get; set; } // Date of account creation
    public List<Order> Orders { get; set; } = new List<Order>();
    public Basket? Basket { get; set; }
}