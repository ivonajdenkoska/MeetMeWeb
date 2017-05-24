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
            var User1 = _userRepo.getUserById(user1);
            var User2 = _userRepo.getUserById(user2);
            Connection connection = new Connection { User1 = User1, User2 = User2, StartDate = DateTime.Now, Status = Status.Waiting };
            return await _repo.CreateConnection(connection);
        }

        public void DeleteConnection(string user1, string user2)
        {
            _repo.DeleteConnection();
        }

        public Task<Connection> AcceptConnection(string user1, string user2)
        {
            throw new NotImplementedException();
        }
    }
}