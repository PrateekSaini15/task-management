using TaskManagement.Infrastructure.Dtos;

namespace TaskManagement.Service.Auth.User
{
    public interface IUserService
    {
        Task<ServiceResponse<bool>> Add(AddRequestModel model);

        Task<ServiceResponse<ListResponseModel>> Get();
    }
}
