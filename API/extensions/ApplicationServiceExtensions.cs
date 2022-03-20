using API.Data;
using API.interfaces;
using API.services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection ApplicationServices(this IServiceCollection services, IConfiguration config)
        {

            //JWT json web Token
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
}