namespace OrderProcessingSystem.Managers;
public class ProductManager(ApplicationDbContext context)
{
    private readonly ApplicationDbContext _context = context;

    // CREATE: Add a new product
    public async Task<Product> AddProductAsync(Product product)
    {
        try
        {
            _context.Products.Add(product); // Add product to DbSet
            await _context.SaveChangesAsync(); // Save changes to the database
            return product;
        }
        catch (Exception ex)
        {
            // Log the exception (using your preferred logging method)
            Console.WriteLine($"Error adding product: {ex.Message}");
            throw new Exception("An error occurred while adding the product.");
        }
    }

    // READ: Get a product by its ID
    public async Task<Product?> GetProductByIdAsync(int productId)
    {
        try
        {
            return await _context.Products.FindAsync(productId);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching product with ID {productId}: {ex.Message}");
            throw new Exception("An error occurred while retrieving the product.");
        }
    }

    // READ: Get all products
    public async Task<List<Product>> GetAllProductsAsync()
    {
        try
        {
            return await _context.Products.ToListAsync(); // Retrieve all products
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching products: {ex.Message}");
            throw new Exception("An error occurred while retrieving the product list.");
        }
    }

    // UPDATE: Update an existing product
    public async Task<Product?> UpdateProductAsync(int productId, Product updatedProduct)
    {
        try
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return null; // Product not found, return null

            // Update properties
            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.StockLevel = updatedProduct.StockLevel;
            product.Description = updatedProduct.Description;
            product.ReorderThreshold = updatedProduct.ReorderThreshold;
            // Update other properties as necessary

            await _context.SaveChangesAsync(); // Save changes to the database
            return product;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating product with ID {productId}: {ex.Message}");
            throw new Exception("An error occurred while updating the product.");
        }
    }

    // DELETE: Remove a product by ID
    public async Task<bool> DeleteProductAsync(int productId)
    {
        try
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return false; // Product not found, return false

            _context.Products.Remove(product); // Remove product from DbSet
            await _context.SaveChangesAsync(); // Save changes to the database
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting product with ID {productId}: {ex.Message}");
            throw new Exception("An error occurred while deleting the product.");
        }
    }

    public async Task<List<Product>> GetLowStockProductsAsync()
    {
        try
        {
            return await _context.Products.Where(p => p.StockLevel <= p.ReorderThreshold).ToListAsync();  
        }
        catch (Exception)
        {
            // TODO   
            throw new Exception("");
        }
    }
}