namespace OrderProcessingSystem.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ProductController(ProductManager productManager) : ControllerBase
{
    private readonly ProductManager _productManager = productManager;

    // CREATE: Add a new product
    [HttpPost]
    public async Task<IActionResult> AddProduct(Product product)
    {
        try
        {
            var createdProduct = await _productManager.AddProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { productId = createdProduct.Id }, createdProduct);
        }
        catch (Exception ex)
        {
            // Log the exception (you might use a logging framework like Serilog, NLog, etc.)
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occurred while creating the product.");
        }
    }

    // READ: Get a product by its ID
    [HttpGet("{productId}")]
    public async Task<IActionResult> GetProductById(int productId)
    {
        try
        {
            var product = await _productManager.GetProductByIdAsync(productId);
            if (product == null) return NotFound("Product not found.");
            return Ok(product);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occurred while fetching the product.");
        }
    }

    // READ: Get all products
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var products = await _productManager.GetAllProductsAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occurred while fetching the product list.");
        }
    }

    // UPDATE: Update an existing product
    [HttpPut("{productId}")]
    public async Task<IActionResult> UpdateProduct(int productId, Product updatedProduct)
    {
        try
        {
            var product = await _productManager.UpdateProductAsync(productId, updatedProduct);
            if (product == null) return NotFound("Product not found.");
            return Ok(product);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occurred while updating the product.");
        }
    }

    // DELETE: Remove a product by ID
    [HttpDelete("{productId}")]
    public async Task<IActionResult> DeleteProduct(int productId)
    {
        try
        {
            var result = await _productManager.DeleteProductAsync(productId);
            if (!result) return NotFound("Product not found.");
            return NoContent();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occurred while deleting the product.");
        }
    }

    // ProductController.cs
    [HttpGet("low-stock")]
    public async Task<IActionResult> GetLowStockProducts()
    {
        try
        {
            var lowStockProducts = await _productManager.GetLowStockProductsAsync();
            if (lowStockProducts == null || lowStockProducts.Count == 0)
            {
                // Return a 404 if there are no low-stock products
                return NotFound("No products with low stock levels were found.");
            }

            return Ok(lowStockProducts);
        }
        catch (Exception ex)
        {
            // Log the exception for troubleshooting (you could use a logging framework here)
            Console.WriteLine(ex.Message);

            // Return a 500 Internal Server Error response
            return StatusCode(500, "An error occurred while retrieving low-stock products.");
        }
    }

}