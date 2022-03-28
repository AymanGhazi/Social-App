using System.Globalization;
using System.Security.Claims;

namespace API.extensions
{
    public static class ClaimsPrincipleExtension
    {
        public static string GetuserName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        }
    }
}