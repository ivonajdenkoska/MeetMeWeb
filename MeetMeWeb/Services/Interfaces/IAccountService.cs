using MeetMeWeb.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Threading.Tasks;

namespace MeetMeWeb.Services.Interfaces
{
    public interface IAccountService : IDisposable
    {
        Task<IdentityResult> RegisterUser(UserModel userModel, string callbackUrl);
        Task<IdentityResult> ConfirmEmail(string userId, string code);
    }
}
