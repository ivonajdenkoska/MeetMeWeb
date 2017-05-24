using MeetMeWeb.Models;
using System;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IConnectionRepository
    {
        Connection GetConnection(string user1, string user2);
        Task<Connection> CreateConnection(Connection connection);
        void DeleteConnection(string user1, string user2);
        void AcceptConnection(string user1, string user2);
    }
}
