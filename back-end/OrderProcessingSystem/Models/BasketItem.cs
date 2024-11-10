namespace OrderProcessingSystem.Models;
public class BasketItem
{
    public int Id { get; set; }
    public int BasketId { get; set; }
    public required Basket Basket { get; set; }
    public int ProductId { get; set; }
    public required Product Product{ get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}