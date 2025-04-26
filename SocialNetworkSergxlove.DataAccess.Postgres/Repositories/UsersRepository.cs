using Microsoft.EntityFrameworkCore;
using SocialNetworkSergxlove.Core.Models;
using SocialNetworkSergxlove.DataAccess.Postgres.Abstractions;
using SocialNetworkSergxlove.DataAccess.Postgres.Models;

namespace SocialNetworkSergxlove.DataAccess.Postgres.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DbContextPostgres _context;

        public UsersRepository(DbContextPostgres context)
        {
            _context = context;
        }

        public async Task<Guid> AddAsync(Users user)
        {
            _context.Users.AsNoTracking();
            await _context.AddAsync(new UsersEntity()
            {
                Id = user.Id,
                Username = user.Username,
                Password = user.Password,
                Role = user.Role
            });
            await _context.SaveChangesAsync();
            return user.Id;
        }

        public async Task<bool> CheckAsync(string username)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Username == username);
            if (user is null) return false;
            return true;
        }

        public async Task<bool> VerifyAsync(string username, string password)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Username == username);
            if (user is null) return false;
            if (user.Password == password) return true;
            return false;
        }

        public async Task<int> UpdatePasswordAsync(string username, string newPassword)
        {
            return await _context.Users
                .AsNoTracking()
                .Where(a => a.Username == username)
                .ExecuteUpdateAsync(s => s.SetProperty(a => a.Password, newPassword));
        }

    }
}
