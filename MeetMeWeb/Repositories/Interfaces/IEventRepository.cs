using MeetMeWeb.Models;
using System;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IEventRepository : IDisposable
    {
         Task<Event> CreateEvent(Event eventModel);
    }
}