using SocialNetworkSergxlove.Infrastructure.Abstractions;
using SocialNetworkSergxlove.Infrastructure.Contracts;
using System.Security.Claims;

namespace SocialNetworkSergxlove.Endpoints
{
    public static class LoginEndpoints
    {
        public static IEndpointRouteBuilder MapLoginEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/login", () =>
            {
                return Results.File("pages/formLogin.html", "text/html;");
            });
            app.MapGet("/logout", (HttpContext context) =>
            {
                context.Response.Cookies.Delete("jwt");
                return Results.Ok();
            }).RequireAuthorization("OnlyForUsers");
            app.MapPost("login", (context) =>
            {
                var jwtGenerate = context.RequestServices.GetService<IJwtProvider>();
                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Role, "user")
                };
                var token = jwtGenerate!.GenerateToken(new JwtRequest()
                {
                    Claims = claims
                });

                context.Response.Cookies.Append("jwt", token!);
                context.Response.StatusCode = 200;
                Results.Redirect("/");
                return Task.CompletedTask;
            });
            app.MapGet("/", () =>
            {
                return Results.File("index.html", "text/html;");
            }).RequireAuthorization("OnlyForUsers");
            return app;
        }
    }
}
