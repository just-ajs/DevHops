using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace DevHopsBackEnd.Models
{
    public class DevHopsDbContext : DbContext
    {

        public DbSet<WorkItem> WorkItems { get; set; }
        public DbSet<StatusUpdate> StatusUpdates { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
        }

        //Constructor with DbContextOptions and the context class itself
        public DevHopsDbContext(DbContextOptions<DevHopsDbContext> options) : base(options)
        {
        }

    }
}



