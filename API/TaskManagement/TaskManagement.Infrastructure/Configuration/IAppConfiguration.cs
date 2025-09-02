namespace TaskManagement.Infrastructure.Configuration
{
    public interface IAppConfiguration
    {
        public JwtConfig JwtConfig { get; }
    }
}
