using MeetMeWeb.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IAuthRepository : IDisposable
    {
        Task<IdentityResult> RegisterUser(UserModel userModel, string callbackUrl);
        Task<IdentityResult> ConfirmEmail(string userId, string code);
        Task<User> FindUser(string email, string password);
        Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login);
    }
}
