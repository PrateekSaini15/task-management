using Backend.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Backend.Pages.Users;

public class UpdateModel: PageModel
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public UpdateModel(DbConnectionFactory dbConnectionFactory)
    {
        this._dbConnectionFactory = dbConnectionFactory;
    }

    [BindProperty]
    public string? FirstName { get; set; }

    [BindProperty]
    public string? LastName { get; set; }

    [BindProperty]
    public string? Email { get; set; }

    [BindProperty]
    public string? Username { get; set; }

    public async Task<IActionResult> OnGetAsync(int id)
    {
        if (id <= 0)
        {
            return NotFound();
        }

        string queryString = "SELECT TOP(1) [Id], [FirstName], [LastName], [Email], [Username]"
            + " FROM [User] WHERE [Id] = @id;";

        using(SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            SqlCommand command = new(queryString, connection);

            command.Parameters.Add("@id", SqlDbType.Int).Value = id;

            try
            {
                await connection.OpenAsync();
                SqlDataReader reader = command.ExecuteReader();

                if (await reader.ReadAsync())
                {
                    this.FirstName = reader.GetString(1);
                    this.LastName = reader.GetString(2);
                    this.Email = reader.GetString(3);
                    this.Username = reader.GetString(4);

                    return Page();
                }
                else
                {
                    //TODO(Prateek): Handle when no record is found
                    return Page();
                }
            }
            catch (SqlException ex)
            {
                //TODO(Prateek): Add Error handling
                return Page();
            }
            catch (Exception ex)
            {
                //TODO(Prateek): Add Error handling
                return Page();
            }
        }
    }

    public async Task<IActionResult> OnPostAsync(int id, CancellationToken cancellationToken)
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

        if (ModelState.IsValid == false)
        {
            return Page();
        }

        var queryString = "UPDATE [User]"
            + " SET [FirstName] = @firstName, [LastName] = @lastName"
            + " WHERE [Id] = @id;";

        using (SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            SqlCommand command = new(queryString, connection);
          
            command.Parameters.Add("@firstName", SqlDbType.VarChar, 100).Value = this.FirstName;
            command.Parameters.Add("@lastName", SqlDbType.VarChar, 100).Value = this.LastName;
            command.Parameters.Add("@id", SqlDbType.Int).Value = id;

            try
            {
                await connection.OpenAsync();
                var result = await command.ExecuteNonQueryAsync(cancellationToken);

                if (result == -1)
                {
                    ModelState.AddModelError("", "This user doesn't exits");
                    return Page();
                }

                return RedirectToPage("./Index");
            }
            catch (SqlException ex)
            {
                //TODO(Prateek): Add Error handling
                return Page();
            }
            catch (Exception ex)
            {
               //TODO(Prateek): Add Error handling
                return Page();
            }
        }
    }
}
