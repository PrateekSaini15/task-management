using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;

namespace Backend.Pages.Users;

public class IndexModel : PageModel
{
    private readonly string _connectionString;

    public IndexModel(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Default");

        if (connectionString is null)
        {
            throw new InvalidOperationException("Default connection string is not present in appsetting.json file.");
        }

        this._connectionString = connectionString;
    }

    public List<UserRow> Rows {get; set;} = new();

    public async Task<IActionResult> OnGetAsync()
    {
        const string queryString = "SELECT [Id], [FirstName], [LastName], [Username], [Email]"
            + "FROM [User];";

        using (SqlConnection connection = new(this._connectionString))
        {
            SqlCommand command = new(queryString, connection);

            try
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                while(reader.Read())
                {
                    this.Rows.Add(new UserRow(reader.GetInt32(0), $"{reader.GetString(1)} {reader.GetString(2)}", reader.GetString(3), reader.GetString(4)));
                }

                reader.Close();
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetType());
                Console.WriteLine(ex.GetBaseException().Message);
            }
        }

        return Page();
    }
}

public readonly record struct UserRow
(
 int Id,
 string Name,
 string Username,
 string Email
);
