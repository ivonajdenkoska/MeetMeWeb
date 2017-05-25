using MeetMeWeb.Repositories.Interfaces;
using MeetMeWeb.Services.Interfaces;
using MeetMeWeb.Models;
using System.Threading.Tasks;
using System;

namespace MeetMeWeb.Services
{
	public class ConnectionService : IConnectionService
	{
        private IConnectionRepository _repo;
        private IUserRepository _userRepo;
        private IConnectionNotificationRepository _notificationRepo;

        public ConnectionService(IConnectionRepository repo, IUserRepository userRepo, IConnectionNotificationRepository notificationRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
            _notificationRepo = notificationRepo;
        }

        public Connection GetConnection(string user1, string user2)
        {
            return _repo.GetConnection(user1, user2);
        }

        public async Task<Connection> CreateConnection(Connection connection)
        {
            var result = await _repo.CreateConnection(connection);
            var notification = new ConnectionNotification { User1 = connection.User1, User2 = connection.User2, Date = DateTime.Now, Read = false, Content = "send you request for connection"};
            _notificationRepo.createNotification(notification);
            return result;
        }

        public void DeleteConnection(Connection connection)
        {
            _repo.DeleteConnection(connection);
        }

        public async Task<Connection> AcceptConnection(Connection connection)
        {
            var result = await _repo.AcceptConnection(connection);
            var notification = new ConnectionNotification { User1 = connection.User2, User2 = connection.User1, Date = DateTime.Now, Read = false, Content = "accepted your request for connection" };
            _notificationRepo.createNotification(notification);
            return result;
        }
    }
}