using SocialNetworkSergxlove.Endpoints;

namespace SocialNetworkSergxlove.Extensions
{
    public static class RegistrEndpoints
    {
        public static IEndpointRouteBuilder MapAllEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapLoginEndpoints();
            app.MapChatingsEndpoints();
            app.MapProfilesEndpoints();
            return app;
        }
    }
}
