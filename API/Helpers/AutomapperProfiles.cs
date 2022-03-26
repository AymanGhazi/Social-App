using System.Linq;
using API.DTos;
using API.Entities;
using API.extensions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.DataProtection;

namespace API.Helpers
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.photoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalcAge()));

            CreateMap<Photo, PhotoDto>();
            
            CreateMap<memberUpdateDto, AppUser>();
        }
    }
}