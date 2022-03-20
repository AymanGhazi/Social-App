using System.ComponentModel.DataAnnotations;

namespace API.DTos
{
    public class RegisterDTo
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }

    }
}