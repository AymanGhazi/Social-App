using System.Threading.Tasks;

namespace API.interfaces
{
    public interface IUnitOfWork
    {
        IuserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        ILIkeRepository LikeRepository { get; }
        Task<bool> Complete();
        bool hasChanges();



    }
}