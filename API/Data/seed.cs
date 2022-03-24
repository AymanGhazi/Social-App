using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;


namespace API.Data
{
    public class seed
    {
        public static async Task SeedUsers(DataContext context)
        {

            if (await context.Users.AnyAsync()) return;

            var UserData = await System.IO.File.ReadAllTextAsync("Data/UserSeedDate.json");
            //text.json
            var users = JsonSerializer.Deserialize<List<AppUser>>(UserData);

            foreach (var user in users)
            {
                var username = user.UserName.ToLower();
                
                using var hamc = new HMACSHA512();
                user.UserName = username;
                user.passwordHash = hamc.ComputeHash(Encoding.UTF8.GetBytes("password"));
                user.passwordSalt = hamc.Key;
                context.Users.Add(user);
            }
            await context.SaveChangesAsync();
        }
    }
}