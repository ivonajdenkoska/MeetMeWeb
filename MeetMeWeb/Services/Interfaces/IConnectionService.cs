using MeetMeWeb.Models;
using System.Threading.Tasks;

namespace MeetMeWeb.Services.Interfaces
{
    public interface IConnectionService
    {
        Connection GetConnection(string user1, string user2);
        Task<Connection> CreateConnection(string user1, string user2);
        void DeleteConnection(string user1, string user2);
        Task<Connection> AcceptConnection(string user1, string user2);
    }
}
