namespace OrderProcessingSystem.Managers;
public class OrderManager(ApplicationDbContext context)
{
    private readonly ApplicationDbContext _context = context;

    // CREATE: Add a new order
    public async Task<Order> CreateOrderAsync(Order order)
    {
        try
        {
            _context.Orders.Add(order); 
            await _context.SaveChangesAsync(); // Save changes to the database
            return order;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating order: {ex.Message}");
            throw new Exception("An error occurred while creating the order.");
        }
    }

    // READ: Get an order by ID
    public async Task<Order?> GetOrderByIdAsync(int orderId)
    {
        try
        {
            return await _context.Orders
                .Include(o => o.OrderItems) // Include related items
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving order with ID {orderId}: {ex.Message}");
            throw new Exception("An error occurred while retrieving the order.");
        }
    }

    // READ: Get all orders
    public async Task<List<Order>> GetAllOrdersAsync()
    {
        try
        {
            return await _context.Orders.Include(o => o.OrderItems).ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving orders: {ex.Message}");
            throw new Exception("An error occurred while retrieving the orders.");
        }
    }

    // UPDATE: Update order status
    public async Task<bool> UpdateOrderStatusAsync(int orderId, int newStatusId)
    {
        try
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return false;

            order.OrderStatusId = newStatusId; // Update the status
            await _context.SaveChangesAsync(); // Save changes
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating order status: {ex.Message}");
            throw new Exception("An error occurred while updating the order status.");
        }
    }

    // DELETE: Remove an order by ID
    public async Task<bool> DeleteOrderAsync(int orderId)
    {
        try
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return false;

            _context.Orders.Remove(order); // Remove the order from DbSet
            await _context.SaveChangesAsync(); // Save changes
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting order with ID {orderId}: {ex.Message}");
            throw new Exception("An error occurred while deleting the order.");
        }
    }
}