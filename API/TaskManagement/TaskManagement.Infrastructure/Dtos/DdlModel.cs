namespace TaskManagement.Infrastructure.Dtos
{
    public class DdlModel
    {
        public List<DdlItem> DdlRole { get; set; } = new();
    }

    public class DdlItem
    {
        public string Text { get; set; } = string.Empty;

        public string Value { get; set; } = string.Empty;
    }
}
