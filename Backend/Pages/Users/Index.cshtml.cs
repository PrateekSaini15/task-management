using Backend.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;

namespace Backend.Pages.Users;

public class IndexModel : PageModel
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public IndexModel(DbConnectionFactory dbConnectionFactory)
    {
        this._dbConnectionFactory = dbConnectionFactory;
    }

    public List<UserRow> Rows {get; set;} = new();

    public async Task<IActionResult> OnGetAsync()
    {
        const string queryString = "SELECT [Id], [FirstName], [LastName], [Username], [Email]"
            + " FROM [User];";

        using (SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            SqlCommand command = new(queryString, connection);

            try
            {
                await connection.OpenAsync();
                SqlDataReader reader = command.ExecuteReader();

                while(await reader.ReadAsync())
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
