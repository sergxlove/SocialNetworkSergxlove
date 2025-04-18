using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkSergxlove.Core.Models;
using SocialNetworkSergxlove.DataAccess.Postgres.Models;

namespace SocialNetworkSergxlove.DataAccess.Postgres.Configurations
{
    public class UsersConfiguration : IEntityTypeConfiguration<UsersEntity>
    {
        public void Configure(EntityTypeBuilder<UsersEntity> builder)
        {
            builder.ToTable("users");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(Users.MAX_LENGTH_USERNAME);
            builder.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(Users.MAX_LENGTH_PASSWORD);
            builder.Property(u => u.Role); 
        }
    }
}
