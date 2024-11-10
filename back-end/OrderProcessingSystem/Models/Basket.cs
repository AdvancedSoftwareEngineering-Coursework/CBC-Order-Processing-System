namespace OrderProcessingSystem.Models;
public class Basket
{
    public int Id { get; set; }
    public required string UserId { get; set; }
    public required User User { get; set; }
    public List<BasketItem>? Items { get; set; }
    public decimal TotalPrice { get; set; }
}