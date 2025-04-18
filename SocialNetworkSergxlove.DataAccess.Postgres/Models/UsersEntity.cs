namespace SocialNetworkSergxlove.DataAccess.Postgres.Models
{
    public class UsersEntity
    {
        public Guid Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "user";
    }
}
