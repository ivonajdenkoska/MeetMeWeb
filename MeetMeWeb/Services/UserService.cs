using System;
using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
using MeetMeWeb.Repositories.Interfaces;
using System.Collections.Generic;

namespace MeetMeWeb.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _repo;
        private IConnectionNotificationRepository _repoNotif;

        public UserService(IUserRepository repo, IConnectionNotificationRepository repoNotif)
        {
            _repo = repo;
            _repoNotif = repoNotif;
        }

        public User getUserById(string id)
        {
            return _repo.getUserById(id);
        }

        public User getUserByUsername(string username)
        {
            return _repo.getUserByUsername(username);
        }

        public List<User> getAll()
        {
            return _repo.getAll();
        }
        
        public List<ConnectionNotification> getConnectionNotifications(string userId, int startPostion, int size)
        {
            return _repoNotif.getConnectionNotifications(userId, startPostion, size);
        }

        public void Dispose()
        {
            _repo.Dispose();
        }
    }
}