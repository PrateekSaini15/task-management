using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.ExtensionMethods;
using TaskManagement.Service.Auth.Login;

namespace TaskManagement.Api.Controllers.v1
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        public const string baseUrl = "api/v1/auth";
        private readonly ILoginService _loginService;

        public AuthController(ILoginService loginService)
        {
            this._loginService = loginService;
        }

        [HttpPost($"{baseUrl}/login")]
        public async Task<IActionResult> Login(LoginRequestModel model)
        {
            var response = await this._loginService.Login(model);

            return response.CreateResponse();
        }
    }
}
