using System.Net;

namespace TaskManagement.Infrastructure.Dtos
{
    public class ServiceResponse<T>
    {
        public T? Data { get; set; }

        public string Message { get; set; } = string.Empty;

        public string ErrorMessage { get; set; } = string.Empty;

        public bool IsSuccess { get; set; }

        public List<ErrorModel> Errors { get; set; } = new();

        public HttpStatusCode StatusCode { get; set; }
    }
}
