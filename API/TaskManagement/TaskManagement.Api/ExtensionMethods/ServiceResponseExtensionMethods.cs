using Microsoft.AspNetCore.Mvc;
using System.Net;
using TaskManagement.Infrastructure.Dtos;

namespace TaskManagement.Api.ExtensionMethods
{
    public static class ServiceResponseExtensionMethods
    {
        public static ActionResult CreateResponse<T>(this ServiceResponse<T> response)
        {
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                return new NotFoundObjectResult(response);
            }
            else if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                return new BadRequestObjectResult(response);
            }
            else if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                return new UnauthorizedObjectResult(response);
            }
            else if (response.StatusCode == HttpStatusCode.Created)
            {
                return new CreatedResult(string.Empty, response);
            }
            else if (response.StatusCode == HttpStatusCode.Conflict)
            {
                var output = new ObjectResult(response)
                {
                    StatusCode = 409
                };

                return output;
            }
            else if (response.StatusCode == HttpStatusCode.InternalServerError)
            {
                var output = new ObjectResult(response)
                {
                    StatusCode = 500
                };

                return output;
            }

            return new OkObjectResult(response);
        }
    }
}
