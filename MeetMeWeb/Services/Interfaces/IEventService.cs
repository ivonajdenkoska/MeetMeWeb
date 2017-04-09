using MeetMeWeb.Models;
using System;
using System.Threading.Tasks;

namespace MeetMeWeb.Services.Interfaces
{
    public interface IEventService : IDisposable
    {
        Task<Event> createEvent(Event eventModel);
    }
}
