using System.ComponentModel.DataAnnotations;

namespace SmartSystems.ViewModels
{
    public class NewUser
    {
        [Required]
        [EmailAddress]
        public string username { get; set; }

        [Required]
        [MinLength(8)]
        public string password { get; set; }
}
}
