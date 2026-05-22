using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading;
using System.Threading.Tasks;

namespace TaskManagement.Pages.Users;

public class IndexModel : PageModel
{
    public async Task<IActionResult> OnGetAsync()
    {
        return Page();
    }
}
