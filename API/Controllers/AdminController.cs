using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        //we add policy via add authorization service
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
            .Include(r => r.Roles)
            .ThenInclude(r => r.Role)
            .OrderBy(u => u.UserName)
            .Select(u => new
            {
                u.Id,
                userName = u.UserName,
                roles = u.Roles.Select(r => r.Role.Name).ToList()
            })
            .ToListAsync();
            return Ok(users);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public ActionResult GetPhotosForModerators()
        {
            return Ok("Admins Or Moderators can see this");
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditUserRoles(string username, [FromQuery] string roles)
        {
            var SelectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }
            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, SelectedRoles.Except(userRoles));
            if (!result.Succeeded)
            {
                BadRequest("failed to add to Roles");
            }
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(SelectedRoles));
            if (!result.Succeeded)
            {
                BadRequest("Failed To remove from Roles");
            }
            return Ok(await _userManager.GetRolesAsync(user));

        }

    }
}