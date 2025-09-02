using TaskManagement.Infrastructure.Dtos;

namespace TaskManagement.Service.Auth.Login
{
    public interface ILoginService
    {
        public Task<ServiceResponse<LoginResponseModel>> Login(LoginRequestModel model);
    }
}
