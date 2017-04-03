using MeetMeWeb.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MeetMeWeb.Repositories
{
    public class AuthRepository : IDisposable
    {
        private MeetMeDbContext _context;

        private UserManager<User> _userManager;

        public AuthRepository()
        {
            _context = new MeetMeDbContext();
            _userManager = new UserManager<User>(new UserStore<User>(_context));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            User user = new User
            {
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                UserName = userModel.Email
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<User> FindUser(string email, string password)
        {
            User user = await _userManager.FindAsync(email, password);

            return user;
        }

        public void Dispose()
        {
            _context.Dispose();
            _userManager.Dispose();
        }
    }
}