using System.ComponentModel.DataAnnotations;

namespace API.DTos
{
    public class RegisterDTo
    {
        [Required]
        public string username { get; set; }

        [StringLength(8, MinimumLength = 4)]
        [Required]
        public string password { get; set; }

    }
}