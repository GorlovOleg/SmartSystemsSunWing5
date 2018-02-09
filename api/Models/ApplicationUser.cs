using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace SmartSystems.Models
{
    public class ApplicationUser: IdentityUser
    {
        public string GivenName { get; set; }
    }
}
