using TaskManagement.Infrastructure.Dtos;

namespace TaskManagement.Service.Project
{
    public interface IProjectService
    {
        Task<ServiceResponse<bool>> Add(AddRequestModel model);
    }
}
