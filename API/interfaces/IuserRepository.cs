using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTos;
using API.Entities;

namespace API.interfaces
{
    public interface IuserRepository
    {
        void update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserbyIdAsync(int id);
        Task<AppUser> GetUserbyUserNameAsync(string UserName);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string username);




    }
}