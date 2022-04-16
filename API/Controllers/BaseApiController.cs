using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //to filter
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")] //api/users
    public class BaseApiController : ControllerBase
    {

    }
}