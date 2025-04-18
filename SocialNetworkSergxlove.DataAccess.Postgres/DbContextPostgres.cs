using Microsoft.EntityFrameworkCore;
using SocialNetworkSergxlove.DataAccess.Postgres.Configurations;
using SocialNetworkSergxlove.DataAccess.Postgres.Models;

namespace SocialNetworkSergxlove.DataAccess.Postgres
{
    public class DbContextPostgres : DbContext
    {
        public DbContextPostgres(DbContextOptions<DbContextPostgres> options) 
            :base(options)
        {
           
        }

        public DbSet<UsersEntity> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsersConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
