using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTos;
using API.Entities;
using API.Helpers;

namespace API.interfaces
{
    public interface IuserRepository
    {
        void update(AppUser user);

        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserbyIdAsync(int id);
        Task<AppUser> GetUserbyUserNameAsync(string UserName);
        Task<pageList<MemberDto>> GetMembersAsync(UserParams userparams);
        Task<MemberDto> GetMemberAsync(string username);

        Task<string> GetUserGender(string username);


    }
}