namespace TaskManagement.Infrastructure.Configuration
{
    public class JwtConfig
    {
        public string Key { get; set; } = string.Empty;

        public string Issuer { get; set; } = string.Empty;

        public string Audience { get; set; } = string.Empty;

        public string ExpiresInMinutes { get; set; } = string.Empty;
    }
}
