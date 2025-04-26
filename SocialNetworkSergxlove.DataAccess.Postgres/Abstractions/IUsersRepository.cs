using SocialNetworkSergxlove.Core.Models;

namespace SocialNetworkSergxlove.DataAccess.Postgres.Abstractions
{
    public interface IUsersRepository
    {
        Task<Guid> AddAsync(Users user);
        Task<bool> CheckAsync(string username);
        Task<int> UpdatePasswordAsync(string username, string newPassword);
        Task<bool> VerifyAsync(string username, string password);
    }
}
