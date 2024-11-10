namespace OrderProcessingSystem.Models;
public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; } 
    public int StockLevel { get; set; }
    public decimal Price { get; set; }
    public int ReorderThreshold { get; set; } // When stock reaches this level, reorder is triggered.
    public List<OrderItem> OrderItems { get; set; } = []; // Navigation property for OrderItems
    public List<BasketItem> BasketItems { get; set; } = []; // Navigation property for BasketItems
}