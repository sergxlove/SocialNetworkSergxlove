using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SocialNetworkSergxlove.Extensions;
using SocialNetworkSergxlove.Infrastructure.Abstractions;
using SocialNetworkSergxlove.Infrastructure.Jwt;
using System.Security.Claims;
using System.Text;

namespace SocialNetworkSergxlove
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddScoped<IJwtProvider, JwtProvider>();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "MyAuthServer",
                        ValidateAudience = true,
                        ValidAudience = "MyAuthClients",
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysecretkeymysecretkeymysecretkey")),
                        ValidateIssuerSigningKey = true
                    };
                    options.Events = new JwtBearerEvents()
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies["jwt"];
                            return Task.CompletedTask;
                        }
                    };
                });
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("OnlyForUsers", policy =>
                {
                    policy.RequireClaim(ClaimTypes.Role, "user");
                });
                options.AddPolicy("OnlyForAdmins", polisy =>
                {
                    polisy.RequireClaim(ClaimTypes.Role, "admin");
                });
            });
            var app = builder.Build();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();

            app.MapAllEndpoints();

            app.Run();
        }
    }
}
