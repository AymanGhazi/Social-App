using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTos;
using API.Entities;
using API.extensions;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IuserRepository _UserRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;
        public MessagesController(IuserRepository UserRepository, IMessageRepository messageRepository, IMapper mapper)
        {
            _mapper = mapper;
            _messageRepository = messageRepository;
            _UserRepository = UserRepository;
        }
        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetuserName();
            if (username == createMessageDto.RecipientUserName.ToLower())
            {
                return BadRequest("You can not send message to yourself");
            }
            var Sender = await _UserRepository.GetUserbyUserNameAsync(username);

            var receipient = await _UserRepository.GetUserbyUserNameAsync(createMessageDto.RecipientUserName);

            if (receipient == null)
            {
                return NotFound();
            }
            var message = new message
            {
                Sender = Sender,
                Recipient = receipient,
                SenderUserName = Sender.UserName,
                RecipientUserName = receipient.UserName,
                content = createMessageDto.content
            };
            _messageRepository.AddMessage(message);
            if (await _messageRepository.SaveAllAsync())
            {
                return Ok(_mapper.Map<MessageDto>(message));
            }
            return BadRequest("Failed to send the messsage");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageForUser([FromQuery] MessageParams messageParams)
        { 
            messageParams.UserName = User.GetuserName();
            var Messages = await _messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(Messages.CurrentPage, Messages.PageSize, Messages.TotalCount, Messages.TotalPages);
            return Messages;
        }

        [HttpGet("thread/{username}")]

        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var CurrentUserName = User.GetuserName();
            return Ok(await _messageRepository.getMessageThread(CurrentUserName, username));
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetuserName();
            var message = await _messageRepository.Getmessage(id);

            if (message.Sender.UserName != username && message.Recipient.UserName != username)
            {
                return Unauthorized();
            }
            
            if (message.Sender.UserName == username)
            {
                message.senderDeleted = true;
            }
            if (message.Recipient.UserName == username)
            {
                message.RecipientDeleted = true;
            }

            if (message.RecipientDeleted && message.senderDeleted)
            {
                _messageRepository.DeleteMessage(message);
            }
            if (await _messageRepository.SaveAllAsync())
            {
                return Ok();
            }
            return BadRequest("problem deleting the Message");
        }
    }
}