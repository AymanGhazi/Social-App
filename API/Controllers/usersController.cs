using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] //api/users

    public class usersController : ControllerBase
    {
        private readonly DataContext _context;

        public usersController(DataContext context)
        {
            _context = context;

        }
        //add endPoints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser() //get list of users
        {

            return await _context.Users.ToListAsync();
        }


        //api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id) //get list of users
        {
            return await _context.Users.FindAsync(id);

        }

    }
}