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

        public List<User> getAll()
        {
            return _repo.getAll();
        }

        public void Dispose()
        {
            _repo.Dispose();
        }
    }
}