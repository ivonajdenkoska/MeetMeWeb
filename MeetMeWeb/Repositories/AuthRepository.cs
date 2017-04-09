using MeetMeWeb.App_Start;
using MeetMeWeb.Models;
using MeetMeWeb.Repositories.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using System;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private MeetMeDbContext _context;

        private UserManager<User> _userManager;

        public AuthRepository()
        {
            _context = new MeetMeDbContext();
            _userManager = new ApplicationUserManager(new UserStore<User>(_context));
            var provider = new DpapiDataProtectionProvider("MeetMe");
            _userManager.UserTokenProvider = new DataProtectorTokenProvider<User>(provider.Create("EmailConfirmation"));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel, string callbackUrl)
        {
            User user = new User
            {
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                UserName = userModel.Email,
                BirthDate = DateTime.Now
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            if (result.Succeeded)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user.Id);

                var url = String.Format("{0}?userId={1}&code={2}", callbackUrl, user.Id, code);

                _userManager.SendEmail(user.Id,
                   "Confirm your account",
                   "Please confirm your account by clicking this link: <a href=\""
                                                   + url + "\">link</a>");
            }

            return result;
        }

        public async Task<IdentityResult> ConfirmEmail(string userId, string code)
        {
            var result = await _userManager.ConfirmEmailAsync(userId, code);
            return result;
        }

        public async Task<User> FindUser(string email, string password)
        {
            User user = await _userManager.FindAsync(email, password);

            return user;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _userManager.AddLoginAsync(userId, login);

            return result;
        }

        public void Dispose()
        {
            _context.Dispose();
            _userManager.Dispose();
        }
    }
}