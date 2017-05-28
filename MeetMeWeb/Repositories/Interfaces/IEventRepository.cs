using MeetMeWeb.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IEventRepository : IDisposable
    {
         Task<Event> CreateEvent(Event eventModel);
         Task<Event> DeleteEvent(string title,Guid id,string username);
         Event EditEvent(string title, Guid id, DateTime start, DateTime end);
         List<Event> getEvents(string username);
    }
}