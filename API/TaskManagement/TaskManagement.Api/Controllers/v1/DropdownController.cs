using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.ExtensionMethods;
using TaskManagement.Service.Common.Dropdown;

namespace TaskManagement.Api.Controllers.v1
{
    [ApiController]
    public class DropdownController : ControllerBase
    {
        private const string baseUrl = "api/v1/dropdown";
        private readonly IDropdownService _dropdownService;

        public DropdownController(IDropdownService dropdownService)
        {
            this._dropdownService = dropdownService;
        }

        [HttpGet($"{baseUrl}")]
        public async Task<IActionResult> Get(string keys)
        {
            var response = await this._dropdownService.Get(keys);

            return response.CreateResponse();
        }
    }
}
