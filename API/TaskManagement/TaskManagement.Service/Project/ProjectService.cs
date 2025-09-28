using System.Net;
using TaskManagement.Domain.Context;
using TaskManagement.Infrastructure.Dtos;
using TaskManagement.Service.Auth.User;
using DomainModel = TaskManagement.Domain.Models;

namespace TaskManagement.Service.Project
{
    public class ProjectService : IProjectService
    {
        private readonly TaskManagementContext _context;
        private readonly ILoggedInUser _loggedInUser;

        public ProjectService(TaskManagementContext context, ILoggedInUser loggedInUser)
        {
            this._context = context;
            this._loggedInUser = loggedInUser;
        }

        public async Task<ServiceResponse<bool>> Add(AddRequestModel model)
        {
            var response = new ServiceResponse<bool>();

            try
            {
                var project = new DomainModel.Project()
                {
                    Name = model.Name,
                    CreatedBy = this._loggedInUser.UserId,
                    CreatedDate = DateTime.Now
                };

                await this._context.Projects.AddAsync(project);
                await this._context.SaveChangesAsync();

                response.IsSuccess = true;
                response.Message = "New project created";
                response.StatusCode = HttpStatusCode.Created;

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
