using System;
using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
using MeetMeWeb.Repositories.Interfaces;

namespace MeetMeWeb.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _repo; 

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public User getUserById(Guid id)
        {
            return _repo.getUserById(id);
        }

        public User getUserByUsername(string username)
        {
            return _repo.getUserByUsername(username);
        }

        public void Dispose()
        {
            _repo.Dispose();
        }
    }
}