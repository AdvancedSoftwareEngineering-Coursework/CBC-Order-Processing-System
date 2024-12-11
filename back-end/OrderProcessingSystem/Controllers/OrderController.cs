namespace OrderProcessingSystem.Controllers;
[ApiController]
[Route("api/orders")]
public class OrderController(OrderManager orderManager) : ControllerBase
{
    private readonly OrderManager _orderManager = orderManager;

    // CREATE: Create a new order
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        try
        {
            var createdOrder = await _orderManager.CreateOrderAsync(order);
            return Ok(createdOrder);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // READ: Get an order by ID
    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetOrder(int orderId)
    {
        try
        {
            var order = await _orderManager.GetOrderByIdAsync(orderId);
            if (order == null) return NotFound(new { message = "Order not found." });

            return Ok(order);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // READ: Get all orders
    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        try
        {
            var orders = await _orderManager.GetAllOrdersAsync();
            return Ok(orders);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // UPDATE: Update order status
    [HttpPut("{orderId}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] int newStatusId)
    {
        try
        {
            var success = await _orderManager.UpdateOrderStatusAsync(orderId, newStatusId);
            if (!success) return NotFound(new { message = "Order not found." });

            return Ok(new { message = "Order status updated successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // DELETE: Delete an order
    [HttpDelete("{orderId}")]
    public async Task<IActionResult> DeleteOrder(int orderId)
    {
        try
        {
            var success = await _orderManager.DeleteOrderAsync(orderId);
            if (!success) return NotFound(new { message = "Order not found." });

            return Ok(new { message = "Order deleted successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}