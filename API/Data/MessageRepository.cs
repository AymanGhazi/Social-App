using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTos;
using API.Entities;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public void AddMessage(message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<message> Getmessage(int id)
        {
            return await _context.Messages.Include(u => u.Sender).Include(u => u.Recipient).SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task<pageList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var Query = _context.Messages.OrderByDescending(m => m.MessageSent).AsQueryable();

            Query = messageParams.container switch
            {
                "inbox" => Query.Where(u => u.Recipient.UserName == messageParams.UserName && u.RecipientDeleted == false),
                "outbox" => Query.Where(u => u.Sender.UserName == messageParams.UserName && u.senderDeleted == false),

                _ => Query.Where(u => u.Recipient.UserName == messageParams.UserName && u.DateRead == null && u.RecipientDeleted == false)
            };

            var message = Query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

            return await pageList<MessageDto>.CreateAsync(message, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> getMessageThread(string CurrentUserName, string ReceipientName)
        {
            var Messages = await _context.Messages
            .Include(u => u.Sender).ThenInclude(u => u.Photos)
            .Include(u => u.Recipient).ThenInclude(u => u.Photos)
             .Where(
            t => t.Recipient.UserName == CurrentUserName && t.RecipientDeleted == false
             && t.Sender.UserName == ReceipientName
             || t.Recipient.UserName == ReceipientName
             && t.Sender.UserName == CurrentUserName
             && t.senderDeleted == false
             )
             .OrderBy(m => m.MessageSent)
             .ToListAsync();

            var UnreadMessages = Messages.Where(m => m.DateRead == null && m.Recipient.UserName == CurrentUserName);
            if (UnreadMessages.Any())
            {
                foreach (var message in UnreadMessages)
                {
                    message.DateRead = DateTime.Now;
                }
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<MessageDto>>(Messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}