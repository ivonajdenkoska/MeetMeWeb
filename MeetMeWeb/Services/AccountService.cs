using MeetMeWeb.Models;
using MeetMeWeb.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MeetMeWeb.Services
{
    public class AccountService : IDisposable
    {
        private AuthRepository _repo = null;

        public AccountService()
        {
            _repo = new AuthRepository();
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