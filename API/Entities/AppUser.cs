using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        public string userName { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }


    }
}