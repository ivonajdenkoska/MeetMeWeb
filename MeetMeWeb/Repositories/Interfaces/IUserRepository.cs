using MeetMeWeb.Models;
using System;
using System.Collections.Generic;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IUserRepository : IDisposable
    {
        User getUserById(string id);
        User getUserByUsername(string username);
        List<User> getAll();
        List<ConnectionNotification> getConnectionNotifications(string userId);
    }
}
