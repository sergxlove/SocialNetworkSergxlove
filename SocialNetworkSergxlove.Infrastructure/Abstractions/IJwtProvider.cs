using SocialNetworkSergxlove.Infrastructure.Contracts;

namespace SocialNetworkSergxlove.Infrastructure.Abstractions
{
    public interface IJwtProvider
    {
        string? GenerateToken(JwtRequest request);
    }
}
