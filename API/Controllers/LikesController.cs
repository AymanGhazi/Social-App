using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using API.DTos;
using API.Entities;
using API.extensions;
using API.Helpers;
using API.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IuserRepository _UserRepository;

        private readonly ILIkeRepository _LikeRepository;
        public LikesController(IuserRepository UserRepository, ILIkeRepository LikeRepository)
        {
            _UserRepository = UserRepository;
            _LikeRepository = LikeRepository;

        }

        //like another user
        [HttpPost("{username}")]
        public async Task<ActionResult> Addlike(string username)
        {
            var sourceuserID = User.GetuserID();

            //Get the user with likes in likeRepository
            var sourceUser = await _LikeRepository.GetUserWithLikes(sourceuserID);

            var LikedUser = await _UserRepository.GetUserbyUserNameAsync(username);


            if (LikedUser == null)
            {
                NotFound();
            }
            if (sourceUser.UserName == LikedUser.UserName)
            {
                return BadRequest("You Can not Like Yourself");
            }
            var userLike = await _LikeRepository.GetUserLike(sourceuserID, LikedUser.Id);
            //if the like is alreadly found
            if (userLike != null)
            {
                if (await _LikeRepository.removeLike(sourceuserID, LikedUser.Id))
                {
                    return Ok("Like Deleted");
                }
            }

            userLike = new UserLike
            {
                SourceUserID = sourceuserID,
                LikedUserID = LikedUser.Id
            };
            sourceUser.UsersILike.Add(userLike);
            if (await _UserRepository.SaveAllAsync())
            {
                return Ok("liked");
            }
            return BadRequest("failed to set the like");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetuserLikes([FromQuery] likesparams likesparams)
        {
            likesparams.userID = User.GetuserID();
            var users = await _LikeRepository.GetuserLikes(likesparams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }




    }
}