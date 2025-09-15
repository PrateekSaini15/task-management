namespace TaskManagement.Service.Auth.User
{
    public class ListResponseModel
    {
        public List<ListItemModel> Users { get; set; } = new();
    }

    public class ListItemModel
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }
}
