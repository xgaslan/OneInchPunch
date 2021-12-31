using System.Threading.Tasks;
using BusinessLayer.Requests;
using BusinessLayer.Responses;
using DataLayer;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Repositories.AuthenticationRepository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly DataContext _context;

        public AuthenticationRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<LoginResponse> Login(LoginRequest loginRequest)
        {
            var checkUser = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginRequest.Email);
            
            if (checkUser == null)
            {
                return null;
            }

            var password = checkUser.Password;
            if (password == loginRequest.Password)
            {
                LoginResponse response = new LoginResponse()
                {
                    FirsName = checkUser.FirsName,
                    LastName = checkUser.LastName
                };
                return response;
            }

             return null;
        }
    }
}