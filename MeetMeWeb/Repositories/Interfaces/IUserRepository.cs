using MeetMeWeb.Models;
using System;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IUserRepository : IDisposable
    {
        User getUserById(Guid id);
        User getUserByUsername(string username);
    }
}
