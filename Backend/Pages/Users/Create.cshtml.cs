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
    public string? LastName { get; set; }

    [BindProperty]
    public string? Username { get; set; }

    [BindProperty]
    public string? Email { get; set; }

    [BindProperty]
    public string? Password { get; set; }

    [BindProperty]
    public string? ConfirmPassword { get; set; }

    public async Task<IActionResult> OnGetAsync()
    {
        return Page();
    }

    public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(this.FirstName) == true)
        {
            ModelState.AddModelError(nameof(this.FirstName), "Required");
        }
        else if(this.FirstName.Length > 100)
        {
            ModelState.AddModelError(nameof(this.FirstName), "Max length is 100 characters only");
        }

        if (string.IsNullOrEmpty(this.LastName) == false && this.LastName.Length > 100)
        {
            ModelState.AddModelError(nameof(this.LastName), "Max length is 100 characters only");
        }

        if (string.IsNullOrEmpty(this.Username) == true )
        {
            ModelState.AddModelError(nameof(this.Username), "Required");
        }
        else if (this.Username.Length > 100)
        {
            ModelState.AddModelError(nameof(this.Username), "Max length is 100 characters only");
        }
        else if (await this.IsUsernameAvailableAsync(this.Username, cancellationToken) == false)
        {
            ModelState.AddModelError(nameof(this.Username), "Username not available");
        }

        if (string.IsNullOrEmpty(this.Email) == true)
        {
            ModelState.AddModelError(nameof(this.Email), "Required");
        }
        else if (this.Email.Length > 100)
        {
            ModelState.AddModelError(nameof(this.Email), "Max length is 100 characters only");
        }
        else if(await this.IsEmailAvailableAsync(this.Email, cancellationToken) == false)
        {
            ModelState.AddModelError(nameof(this.Email), "Email not available");
        }

        if (string.IsNullOrEmpty(this.Password) == true)
        {
            ModelState.AddModelError(nameof(this.Password), "Required");
        }
        else if (this.Password.Length > 100)
        {
            ModelState.AddModelError(nameof(this.Password), "Max length is 100 characters only");
        }

        if (string.IsNullOrEmpty(this.ConfirmPassword) == true)
        {
            ModelState.AddModelError(nameof(this.ConfirmPassword), "Required");
        }

        if (this.Password != this.ConfirmPassword)
        {
            ModelState.AddModelError(nameof(this.ConfirmPassword), "Password is not matching");
        }

        if (ModelState.IsValid == false)
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
            command.Parameters.Add("@password", SqlDbType.VarChar, 100).Value = this.Password;
            command.Parameters.Add("@roleId", SqlDbType.Int).Value = 2;

            try
            {
                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
                ModelState.AddModelError("", "Failed to create user due to database error");
                return Page();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetType());
                Console.WriteLine(ex.GetBaseException().Message);
                ModelState.AddModelError("", "Failed to create user due to server error");
                return Page();
            }
        }

        return RedirectToPage("./Index");
    }

    public async Task<JsonResult> OnGetIsUsernameAvailableAsync(string username, CancellationToken cancellationToken)
    {
        bool isAvailable = await this.IsUsernameAvailableAsync(username, cancellationToken);

        return new JsonResult( new { IsAvailable = isAvailable});
    }

    private async Task<bool> IsUsernameAvailableAsync(string username, CancellationToken cancellationToken)
    {
        bool isAvailable = false;
        var queryString = "SELECT  Top(1) 1"
            + " FROM [User] WHERE [Username]  = @username;";

        using (SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            SqlCommand command = new(queryString, connection);

            command.Parameters.Add("@username", SqlDbType.VarChar, 100).Value = username;

            try
            {
                await connection.OpenAsync();

                var result = await command.ExecuteScalarAsync(cancellationToken);

                isAvailable = result == null;
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

            return isAvailable;
        }
    }

    public async Task<JsonResult> OnGetIsEmailAvailableAsync(string email, CancellationToken cancellationToken)
    {
        bool isAvailable = await this.IsEmailAvailableAsync(email, cancellationToken);

        return new JsonResult(new { IsAvailable = isAvailable });
    }

    private async Task<bool> IsEmailAvailableAsync(string email, CancellationToken cancellationToken)
    {
        bool isAvailable = false;

        var queryString = "SELECT TOP(1) 1"
            + " FROM [User] WHERE [Email] = @email";

        using(SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            SqlCommand command = new(queryString, connection);

            command.Parameters.Add("@email", SqlDbType.VarChar, 100).Value = email;

            try
            {
                await connection.OpenAsync();

                var result = await command.ExecuteScalarAsync(cancellationToken);

                isAvailable = result == null;
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
            }

            return isAvailable;
        }
    }
}
