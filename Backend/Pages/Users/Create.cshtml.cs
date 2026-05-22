using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading;
using System.Threading.Tasks;

namespace TaskManagement.Pages.Users;

public class CreateModel : PageModel
{
    [BindProperty]
    public string? FirstName { get; set; }

    public string? LastName {get; set; }

    public string? Username {get; set;}

    public string? Email {get; set;}

    public async Task<IActionResult> OnGetAsync()
    {
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        bool modelStateIsValid = true;

        if (string.IsNullOrEmpty(this.FirstName) == true)
        {
            ModelState.AddModelError(nameof(this.FirstName), "Required");
            modelStateIsValid = false;
        }

        if (string.IsNullOrEmpty(this.Username) == true )
        {
            ModelState.AddModelError(nameof(this.Username), "Required");
            modelStateIsValid = false;
        }

        if (string.IsNullOrEmpty(this.Email) == true)
        {
            ModelState.AddModelError(nameof(this.Email), "Required");
            modelStateIsValid = false;
        }

        if (modelStateIsValid == false)
        {
            return Page();
        }

        return RedirectToPage("./Index");
    }

    public async Task<JsonResult> OnGetCheckUsernameAsync(string username)
    {
        if (username == "Prateek")
        {
            return new JsonResult(new { IsAvailable = false});
        }

        return new JsonResult( new { IsAvailable = true });
    }
}
