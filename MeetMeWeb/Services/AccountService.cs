using MeetMeWeb.Models;
using MeetMeWeb.Repositories.Interfaces;
using MeetMeWeb.Services.Interfaces;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace MeetMeWeb.Services
{
    public class AccountService : IAccountService
    {
        private IAuthRepository _repo;

        public AccountService(IAuthRepository repo)
        {
            _repo = repo;
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel, string callbackUrl)
        {
            return await _repo.RegisterUser(userModel, callbackUrl);
        }

        public async Task<IdentityResult> ConfirmEmail(string userId, string code)
        {
            return await _repo.ConfirmEmail(userId, code);
        }

        public void Dispose()
        {
            _repo.Dispose();
        }
    }
}