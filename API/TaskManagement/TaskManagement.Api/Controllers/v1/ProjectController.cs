using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.ExtensionMethods;
using TaskManagement.Service.Project;

namespace TaskManagement.Api.Controllers.v1
{
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private const string baseUrl = "api/v1/project";
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            this._projectService = projectService;
        }

        [HttpPost($"{baseUrl}")]
        public async Task<IActionResult> Add(AddRequestModel model)
        {
            var response = await this._projectService.Add(model);

            return response.CreateResponse();
        }
    }
}
