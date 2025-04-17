using Microsoft.IdentityModel.Tokens;
using SocialNetworkSergxlove.Infrastructure.Abstractions;
using SocialNetworkSergxlove.Infrastructure.Contracts;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SocialNetworkSergxlove.Infrastructure.Jwt
{
    public class JwtProvider : IJwtProvider
    {
        public string? GenerateToken(JwtRequest request)
        {
            JwtSecurityToken token = new(
            issuer: request.Issuer,
                    audience: request.Audience,
                    claims: request.Claims,
                    expires: request.Expires,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes(request.SecretKey)),
                    SecurityAlgorithms.HmacSha256));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
