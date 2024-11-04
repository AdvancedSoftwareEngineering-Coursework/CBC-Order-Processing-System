namespace OrderProcessingSystem.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalCost { get; set; }
        public OrderStatus Status { get; set; } 
        public List<OrderItem> OrderItems { get; set; } = [];
        public DateTime? DeliveryDate { get; set; }
        public string DeliveryMethod { get; set; } // Express Or Standard 
    }
}