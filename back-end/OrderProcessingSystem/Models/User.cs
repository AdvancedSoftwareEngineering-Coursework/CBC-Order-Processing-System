namespace OrderProcessingSystem.Models;
public class User : IdentityUser
{
    public List<Order> Orders { get; set; } = new List<Order>();
    public Basket? Basket { get; set; }
}