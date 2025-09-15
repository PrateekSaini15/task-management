using Microsoft.EntityFrameworkCore;
using System.Net;
using TaskManagement.Domain.Context;
using TaskManagement.Infrastructure.Dtos;
using TaskManagement.Infrastructure.ExtensionMethods;
using DomainModel = TaskManagement.Domain.Models;

namespace TaskManagement.Service.Auth.User
{
    public class UserService : IUserService
    {
        private readonly TaskManagementContext _context;
        private readonly ILoggedInUser _loggedInUser;

        public UserService(TaskManagementContext context, ILoggedInUser loggedInUser)
        {
            this._context = context;
            this._loggedInUser = loggedInUser;
        }

        public async Task<ServiceResponse<bool>> Add(AddRequestModel model)
        {
            var response = new ServiceResponse<bool>();

            try
            {
                var existingUser = await this._context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

                if (existingUser is not null)
                {
                    var error = new ErrorModel()
                    {
                        Property = nameof(model.Username).ToCamelCase(),
                        Error = "Username already in use. Choose something else"
                    };

                    response.IsSuccess = false;
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Errors.Add(error);

                    return response;
                }

                var role = await this._context.Roles.FirstAsync(r => r.Id == model.RoleId);

                var newUser = new DomainModel.User()
                {
                    FirstName = model.FirstName,
                    LastName = string.IsNullOrEmpty(model.LastName) == true ? null : model.LastName,
                    Username = model.Username,
                    Email = model.Email,
                    Password = model.Password,
                    Roles = new List<DomainModel.Role>() { role },
                    CreatedBy = 1,
                    CreatedDate = DateTime.Now
                };

                await this._context.Users.AddAsync(newUser);

                await this._context.SaveChangesAsync();

                response.IsSuccess = true;
                response.StatusCode = HttpStatusCode.Created;
                response.Message = "New user created successfully";

                return response;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Internal Server Error";
                response.ErrorMessage = ex.GetBaseException().Message;
                response.StatusCode = HttpStatusCode.InternalServerError;

                return response;
            }
        }

        public async Task<ServiceResponse<ListResponseModel>> Get()
        {
            var response = new ServiceResponse<ListResponseModel>()
            {
                Data = new()
            };

            try
            {
                var users = await this._context.Users.Select(u => new ListItemModel()
                {
                    Id = u.Id,
                    Name = $"{u.FirstName} {u.LastName}",
                    Role = u.Roles.First().Name
                }).ToListAsync();

                response.Data.Users.AddRange(users);
                response.IsSuccess = true;
                response.StatusCode = HttpStatusCode.OK;

                return response;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Internal Server Error";
                response.ErrorMessage = ex.GetBaseException().Message;
                response.StatusCode = HttpStatusCode.InternalServerError;

                return response;
            }
        }
    }
}
