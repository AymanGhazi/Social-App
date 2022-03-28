using API.Data;
using API.Helpers;
using API.interfaces;
using API.services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection ApplicationServices(this IServiceCollection services, IConfiguration config)
        {

            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            services.AddScoped<IuserRepository, UserRepository>();

            services.AddScoped<IPhotoService, PhotoService>();

            services.AddScoped<ITokenService, TokenService>();

            services.AddAutoMapper(typeof(AutomapperProfiles).Assembly);

            //JWT json web Token
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}