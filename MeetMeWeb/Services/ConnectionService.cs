using MeetMeWeb.Repositories.Interfaces;
using MeetMeWeb.Services.Interfaces;
using System;
using MeetMeWeb.Models;
using System.Threading.Tasks;

namespace MeetMeWeb.Services
{
	public class ConnectionService : IConnectionService
	{
        private IConnectionRepository _repo;
        private IUserRepository _userRepo;

        public ConnectionService(IConnectionRepository repo, IUserRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        public Connection GetConnection(string user1, string user2)
        {
            return _repo.GetConnection(user1, user2);
        }

        public async Task<Connection> CreateConnection(string user1, string user2)
        {
            return await _repo.CreateConnection(new Connection { User1 = _userRepo.getUserById(user1), User2 = _userRepo.getUserById(user2), StartDate = DateTime.Now, Status = Status.Waiting });
        }

        public void DeleteConnection(string user1, string user2)
        {
            _repo.DeleteConnection(user1, user2);
        }

        public void AcceptConnection(string user1, string user2)
        {
            _repo.AcceptConnection(user1, user2);
        }
    }
}