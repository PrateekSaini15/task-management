using Backend.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace Backend.Pages.Users;

public class CreateModel : PageModel
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public CreateModel(DbConnectionFactory dbConnectionFactory)
    {
        this._dbConnectionFactory = dbConnectionFactory;
    }

    [BindProperty]
    public string? FirstName { get; set; }

    [BindProperty]
    public string? LastName {get; set; }

    [BindProperty]
    public string? Username {get; set;}

    [BindProperty]
    public string? Email {get; set;}

    public async Task<IActionResult> OnGetAsync()
    {
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        bool modelStateIsValid = true;

        if (string.IsNullOrEmpty(this.FirstName) == true)
        {
            ModelState.AddModelError(nameof(this.FirstName), "Required");
            modelStateIsValid = false;
        }

        if (string.IsNullOrEmpty(this.Username) == true )
        {
            ModelState.AddModelError(nameof(this.Username), "Required");
            modelStateIsValid = false;
        }

        if (string.IsNullOrEmpty(this.Email) == true)
        {
            ModelState.AddModelError(nameof(this.Email), "Required");
            modelStateIsValid = false;
        }

        if (modelStateIsValid == false)
        {
            return Page();
        }

        var queryString = "INSERT INTO [User] ([FirstName], [LastName], [Username], [Email], [Password], [RoleId])"
            + " VALUES(@firstName, @lastName, @username, @email, @password, @roleId);";

        using (SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            using SqlCommand command = new(queryString, connection);

            command.Parameters.Add("@firstName", SqlDbType.VarChar, 100).Value = this.FirstName;
            command.Parameters.Add("@lastName", SqlDbType.VarChar, 100).Value = this.LastName;
            command.Parameters.Add("@username", SqlDbType.VarChar, 100).Value = this.Username;
            command.Parameters.Add("@email", SqlDbType.VarChar, 100).Value = this.Email;
            command.Parameters.Add("@password", SqlDbType.VarChar, 100).Value = "123456";
            command.Parameters.Add("@roleId", SqlDbType.Int).Value = 2;

            try
            {
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
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

        return RedirectToPage("./Index");
    }

    public async Task<JsonResult> OnGetCheckUsernameAsync(string username)
    {
        if (username == "Prateek")
        {
            return new JsonResult(new { IsAvailable = false});
        }

        return new JsonResult( new { IsAvailable = true });
    }
}
