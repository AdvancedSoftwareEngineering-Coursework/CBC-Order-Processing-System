
namespace OrderProcessingSystem.DbContexts;
public class ApplicationDbContext : IdentityDbContext
{
    private readonly IConfiguration _configuration;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) 
        : base(options)
    {
        _configuration = configuration;
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderStatus> OrderStatus { get; set; }
    public DbSet<Basket> Basket { get; set; }
    public DbSet<BasketItem> BasketItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define the one-to-one relationship between User and Basket
        modelBuilder.Entity<User>()
            .HasOne(u => u.Basket)
            .WithOne(b => b.User)
            .HasForeignKey<Basket>(b => b.UserId); // Define foreign key in Basket table

        // Call base method to ensure any other configurations are applied
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(_configuration.GetConnectionString("DbConnection"));
    }
}