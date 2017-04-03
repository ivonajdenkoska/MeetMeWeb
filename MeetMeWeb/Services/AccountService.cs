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
        public AuthRepository _repo = null;
        public AccountService()
        {
            _repo = new AuthRepository();
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            return await _repo.RegisterUser(userModel);
        }

        public void Dispose()
        {
            _repo.Dispose();
        }
    }
}