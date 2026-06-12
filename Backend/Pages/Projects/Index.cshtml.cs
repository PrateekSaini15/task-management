using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Backend.Pages.Projects;

public class IndexModel : PageModel
{
    public IActionResult OnGet()
    {
        return Page();
    }

}
