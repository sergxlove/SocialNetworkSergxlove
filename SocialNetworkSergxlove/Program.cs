using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SocialNetworkSergxlove.DataAccess.Postgres;
using SocialNetworkSergxlove.DataAccess.Postgres.Abstractions;
using SocialNetworkSergxlove.DataAccess.Postgres.Repositories;
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
            builder.Services.AddDbContext<DbContextPostgres>(options =>
            {
                options.UseNpgsql("connectionstring");
            });
            builder.Services.AddScoped<IJwtProvider, JwtProvider>();
            builder.Services.AddScoped<IUsersRepository, UsersRepository>();
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
                        },
                        OnChallenge = context =>
                        {
                            context.HandleResponse();
                            context.Response.Redirect("/login");
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
