using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;

        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> getSecret()
        {

            return "this is sercret";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> notFound()
        {
            var thing = _context.Users.Find(-1);
            if (thing == null) return NotFound("Not Found");
            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> getServerError()
        {
            var thing = _context.Users.Find(-1);
            var thingToError = thing.ToString();
            return thingToError;
        }
        [HttpGet("bad-request")]
        public ActionResult<string> badRequest()
        {

            return BadRequest();
        }


    }
}