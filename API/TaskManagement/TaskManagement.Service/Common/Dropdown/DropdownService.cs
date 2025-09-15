using Microsoft.EntityFrameworkCore;
using System.Net;
using TaskManagement.Domain.Context;
using TaskManagement.Infrastructure.Dtos;
using TaskManagement.Infrastructure.Enums;

namespace TaskManagement.Service.Common.Dropdown
{
    public class DropdownService : IDropdownService
    {
        private readonly TaskManagementContext _context;

        public DropdownService(TaskManagementContext context)
        {
            this._context = context;
        }

        public async Task<ServiceResponse<DdlModel>> Get(string keys)
        {
            var response = new ServiceResponse<DdlModel>()
            {
                Data = new()
            };

            try
            {
                if (string.IsNullOrEmpty(keys) == true)
                {
                    response.IsSuccess = true;
                    response.StatusCode = HttpStatusCode.OK;

                    return response;
                }

                foreach (var item in keys.Split(",", StringSplitOptions.RemoveEmptyEntries))
                {
                    if (item.Equals(DdlKeysEnum.DdlRole.ToString()) == true)
                    {
                        response.Data.DdlRole = await this._context.Roles.Select(r => new DdlItem() { Text = r.Name, Value = r.Id.ToString() }).ToListAsync();
                    }
                }

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
