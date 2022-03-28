using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTos;
using API.Entities;
using API.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    public class AccountController : BaseApiController
    {

        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;

        }
        [HttpPost("register")]
        //[fromBody] is not necessary as we get [ApiController in the decorated of the controller]
        public async Task<ActionResult<userDto>> Register(RegisterDTo regitsreDto)
        {
            if (await userExist(regitsreDto.username)) return BadRequest("username is taken");

            //Disposing the hmac with using so we dispose it after it finishes
            //username must be string to be hashed so we have to make DTAs , object that holds the same types from the front end
            //and  assign it to  the main class AppUser


            using var hmac = new HMACSHA512(); //hashing the password

            var user = new AppUser
            {
                UserName = regitsreDto.username.ToLower(),
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(regitsreDto.password)),
                passwordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new userDto
            {
                userName = user.UserName,
                token = _tokenService.CreateToken(user),


            };

        }

        //login
        [HttpPost("login")]
        public async Task<ActionResult<userDto>> login(loginDto loginDto)
        {
            var user = await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == loginDto.username);
            if (user == null)
            {
                return Unauthorized("Invalid username");
            }
            using var hmac = new HMACSHA512(user.passwordSalt);
            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            for (int i = 0; i < computedhash.Length; i++)
            {
                if (computedhash[i] != user.passwordHash[i])
                    return Unauthorized("invalid passsword");
            }
            return new userDto
            {
                userName = user.UserName,
                token = _tokenService.CreateToken(user),
                photoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };
        }

        private async Task<bool> userExist(string username)
        {
            //search for exist username
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }


    }
}