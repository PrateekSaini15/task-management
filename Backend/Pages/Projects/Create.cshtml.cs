using Backend.Infrastructure.Persistence;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;

namespace Backend.Pages.Projects;

public class CreateModel : PageModel
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public CreateModel(DbConnectionFactory dbConnectionFactory)
    {
        this._dbConnectionFactory = dbConnectionFactory;
    }

    public List<DropdownItem> Members { get; set; } = new();

    public List<DropdownItem> Roles { get; set; } = new();

    public async Task<IActionResult> OnGet()
    {
        this.Members.AddRange(await this.MemberDdl());
        this.Roles.AddRange(await this.RoleDdl());

        return Page();
    }

    public async Task<IActionResult> OnPostSave()
    {
        string json = string.Empty;
        DateTime now = DateTime.Now;
        int projectId = 0;

        Console.WriteLine(ModelState.IsValid);

        using(StreamReader reader = new(Request.Body))
        {
            json = await reader.ReadToEndAsync();
        }
        
        RequestModel? model = JsonSerializer.Deserialize<RequestModel>(json);

        if (model is null)
        {
            return new JsonResult(new { IsSuccess = false, ErrorMessage = "Invalid request data." });
        }

        string projectQuery = "INSERT INTO [Project] ([Name], [StatusId], [IsDeleted], [CreatedBy], [CreatedDate])"
            + " OUTPUT INSERTED.Id"
            + " VALUES (@name, @statusId, 0, 1, @createdDate)";
        string memberQuery = "INSERT INTO [ProjectMember] ([ProjectId], [UserId], [RoleId], [CreatedBy], [CreatedDate])"
            + " VALUES (@projectId, @userId, @roleId, @createdBy, @createdDate)";

        using (SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            try
            {
                await connection.OpenAsync();

                SqlTransaction transaction = connection.BeginTransaction();

                SqlCommand command = new(projectQuery, connection, transaction);
                command.Parameters.Add("@name", SqlDbType.VarChar, 100).Value = model.Name;
                command.Parameters.Add("@statusId", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@createdDate", SqlDbType.DateTime).Value = now;

                projectId = (int)command.ExecuteScalar();

                foreach (Member member in model.Members)
                {
                    SqlCommand memberCommand = new(memberQuery, connection, transaction);
                    memberCommand.Parameters.Add("@projectId", SqlDbType.Int).Value = projectId;
                    memberCommand.Parameters.Add("@userId", SqlDbType.Int).Value = member.MemberId;
                    memberCommand.Parameters.Add("@roleId", SqlDbType.Int).Value = member.RoleId;
                    memberCommand.Parameters.Add("@createdBy", SqlDbType.Int).Value = 1;
                    memberCommand.Parameters.Add("@createdDate", SqlDbType.DateTime).Value = now;

                    memberCommand.ExecuteNonQuery();
                }

                transaction.Commit();
            }
            catch (Exception ex)
            {
                return new JsonResult(new { IsSuccess = false, ErrorMessage = ex.GetBaseException().Message });
            }
        }

        return new JsonResult(new {IsSuccess = true});
    }

    private async Task<List<DropdownItem>> MemberDdl()
    {
        List<DropdownItem> output = new() ;
        string queryString = "SELECT [Id], [FirstName], [LastName]"
            + " FROM [User] WHERE [RoleId] <> 1";

        using(SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            SqlCommand command = new(queryString, connection);

            try
            {
                await connection.OpenAsync();
                SqlDataReader reader = command.ExecuteReader();

                int id = reader.GetOrdinal("Id");
                int firstName = reader.GetOrdinal("FirstName");
                int lastName = reader.GetOrdinal("LastName");

                while(await reader.ReadAsync())
                {
                    DropdownItem item = new()
                    {
                        Value = reader.GetInt32(id).ToString(),
                        Text = $"{reader.GetString(firstName)} {reader.GetString(lastName)}"
                    };
                   
                    output.Add(item);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
            }
        }

        return output;
    }

    private async Task<List<DropdownItem>> RoleDdl()
    {
        List<DropdownItem> output = new();
        string queryString = "SELECT [Id], [Name]"
            + " FROM [ProjectRole]";

        using(SqlConnection connection = this._dbConnectionFactory.GetConnection())
        {
            SqlCommand command = new(queryString, connection);

            try
            {
                await connection.OpenAsync();

                SqlDataReader reader = command.ExecuteReader();

                int id = reader.GetOrdinal("Id");
                int name = reader.GetOrdinal("Name");

                while(await reader.ReadAsync())
                {
                    DropdownItem item = new()
                    {
                        Value = reader.GetInt32(id).ToString(),
                        Text = reader.GetString(name)
                    };

                    output.Add(item);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
            }
        }

        return output;
    }
}

public class RequestModel
{
    public string? Name { get; set; }

    public List<Member> Members { get; set; } = new();
}

public class Member
{
    public int MemberId { get; set; }

    public int RoleId { get; set; }
}
