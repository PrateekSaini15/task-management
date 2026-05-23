using Microsoft.Data.SqlClient;

namespace Backend.Infrastructure.Persistence;

public sealed class DbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(string connectionString)
    {
        this._connectionString = connectionString;
    }

    public SqlConnection GetConnection()
    {
        return new SqlConnection(this._connectionString);
    }
}
