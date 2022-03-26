using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTos;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    [Authorize]
    public class usersController : BaseApiController
    {

        private readonly IuserRepository _UserRepository;
        private readonly IMapper _mapper;

        public usersController(IuserRepository UserRepository, IMapper mapper)
        {
            _mapper = mapper;
            _UserRepository = UserRepository;


        }

        //add endPoints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() //get list of users
        {
            var users = await _UserRepository.GetMembersAsync();


            // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(users);
        }



        //api/users/3
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username) //get list of users
        {
            return await _UserRepository.GetMemberAsync(username);

        }

        /// <summary>
        /// update into the database via the token which we get by the username
        /// </summary>
        /// <param name="memberUpdateDto"></param>
        /// <returns>NoContent or BadRequest</returns>
        [HttpPut]
        public async Task<ActionResult> updateUser(memberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _UserRepository.GetUserbyUserNameAsync(username);
            //mapping the param into the user
            _mapper.Map(memberUpdateDto, user);
            _UserRepository.update(user);
            if (await _UserRepository.SaveAllAsync())
            {
                return NoContent();
            }
            return BadRequest("Failed to update user");

        }
    }
}