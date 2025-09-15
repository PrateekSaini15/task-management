namespace TaskManagement.Service.Auth.User
{
    public interface ILoggedInUser
    {
        int UserId { get; }

        List<int> RoleIds { get; }
    }
}
