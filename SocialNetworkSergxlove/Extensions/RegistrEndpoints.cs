using SocialNetworkSergxlove.Endpoints;

namespace SocialNetworkSergxlove.Extensions
{
    public static class RegistrEndpoints
    {
        public static IEndpointRouteBuilder MapAllEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapLoginEndpoints();
            return app;
        }
    }
}
