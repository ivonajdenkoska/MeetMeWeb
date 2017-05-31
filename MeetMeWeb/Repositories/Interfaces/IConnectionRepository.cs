using MeetMeWeb.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IConnectionRepository
    {
        Connection GetConnection(string user1, string user2);
        Task<Connection> CreateConnection(Connection connection);
        void DeleteConnection(Connection connection);
        Task<Connection> AcceptConnection(Connection connection);
        List<User> getFriends(string userName);
    }
}
