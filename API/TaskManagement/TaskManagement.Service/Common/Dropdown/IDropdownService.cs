using TaskManagement.Infrastructure.Dtos;

namespace TaskManagement.Service.Common.Dropdown
{
    public interface IDropdownService
    {
        Task<ServiceResponse<DdlModel>> Get(string keys);
    }
}
