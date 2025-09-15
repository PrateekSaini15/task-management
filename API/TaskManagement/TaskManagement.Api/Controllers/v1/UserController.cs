using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.ExtensionMethods;
using TaskManagement.Service.Auth.User;

namespace TaskManagement.Api.Controllers.v1
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private const string baseUrl = "api/v1/user";
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost($"{baseUrl}")]
        public async Task<IActionResult> Add(AddRequestModel model)
        {
            var response = await this._userService.Add(model);

            return response.CreateResponse();
        }
    }
}
