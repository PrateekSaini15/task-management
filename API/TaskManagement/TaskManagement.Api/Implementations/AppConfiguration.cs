using TaskManagement.Infrastructure.Configuration;

namespace TaskManagement.Api.Implementations
{
    public class AppConfiguration : IAppConfiguration
    {
        public AppConfiguration(IConfiguration configuration)
        {
            configuration.GetSection(nameof(JwtConfig)).Bind(this.JwtConfig);
        }

        public JwtConfig JwtConfig { get; } = new();
    }
}
