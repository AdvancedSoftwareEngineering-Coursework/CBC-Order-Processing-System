namespace OrderProcessingSystem.Models
{
    public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int StockLevel { get; set; }
    public decimal Price { get; set; }
    public int ReorderThreshold { get; set; } // When stock reaches this level, reorder is triggered.
    public bool IsLowStock() => StockLevel <= ReorderThreshold;
   
}

}