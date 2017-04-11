using MeetMeWeb.Models;
using System;

namespace MeetMeWeb.Services.Interfaces
{
    public interface IUserService : IDisposable
    {
        User getUserById(Guid id);
        User getUserByUsername(string username);
    }
}
