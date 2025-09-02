using System.Text.Json;

namespace TaskManagement.Infrastructure.ExtensionMethods
{

    public static class StringExtensionMethods
    {
        public static string ToCamelCase(this string input)
        {
            return JsonNamingPolicy.CamelCase.ConvertName(input);
        }
    }
}
