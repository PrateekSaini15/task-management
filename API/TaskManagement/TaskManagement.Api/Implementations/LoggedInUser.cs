using TaskManagement.Service.Auth.User;

namespace TaskManagement.Api.Implementations
{
    public class LoggedInUser : ILoggedInUser
    {
        private readonly IHttpContextAccessor _httpContext;

        public LoggedInUser(IHttpContextAccessor httpContext)
        {
            this._httpContext = httpContext;
        }


        public int UserId
        {
            get
            {
                return int.Parse(_httpContext.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value ?? "0");
            }
        }

        public List<int> RoleIds
        {
            get
            {
                string areaIds = _httpContext.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "RoleIds")?.Value ?? "";

                if (string.IsNullOrEmpty(areaIds) == true)
                {
                    return new List<int>();
                }

                return areaIds.Split(",").ToList().ConvertAll(a => int.Parse(a));
            }
        }
    }
}
