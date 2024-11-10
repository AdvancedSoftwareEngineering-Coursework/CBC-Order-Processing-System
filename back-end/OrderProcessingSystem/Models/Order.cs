namespace OrderProcessingSystem.Models;
public class Order
{
    public int OrderId { get; set; }
    public required string UserId { get; set; } // Foreign key for User
    public required User User { get; set; } // Navigation property for User

    public DateTime OrderDate { get; set; }
    public decimal TotalCost { get; set; }

    public int OrderStatusId { get; set; } // Foreign key for OrderStatus
    public required OrderStatus OrderStatus { get; set; } // Navigation property for OrderStatus

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Navigation property for OrderItems
    public required string DeliveryMethod { get; set; }
    public DateTime DeliveryDate { get; set; }
}