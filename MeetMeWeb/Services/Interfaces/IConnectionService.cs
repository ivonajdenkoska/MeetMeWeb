using MeetMeWeb.Models;
using System.Threading.Tasks;

namespace MeetMeWeb.Services.Interfaces
{
    public interface IConnectionService
    {
        Connection GetConnection(string user1, string user2);
        Task<Connection> CreateConnection(Connection connection);
        void DeleteConnection(Connection connection);
        Task<Connection> AcceptConnection(Connection connection);
    }
}
