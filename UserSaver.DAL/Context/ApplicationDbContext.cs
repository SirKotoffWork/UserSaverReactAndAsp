using Microsoft.EntityFrameworkCore;
using UserSaver.DAL.Model;

namespace UserSaver.DAL.Context;

public class ApplicationDbContext:DbContext
{
    public DbSet<User> Users { get; set; }
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
       // Database.EnsureDeleted();
        Database.EnsureCreated();
    }
}