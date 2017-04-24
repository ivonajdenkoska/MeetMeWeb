using MeetMeWeb.Models;
using System;
using System.Collections.Generic;

namespace MeetMeWeb.Services.Interfaces
{
    public interface IUserService : IDisposable
    {
        User getUserById(Guid id);
        User getUserByUsername(string username);
        List<User> getAll();
    }
}
