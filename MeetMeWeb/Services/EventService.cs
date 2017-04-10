using MeetMeWeb.Models;
using MeetMeWeb.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MeetMeWeb.Services
{
    public class EventService : IDisposable
    {
        private EventRepo _repo = null;

        public EventService()
        {
            _repo = new EventRepo();
        }

        public async Task<Event> createEvent(Event eventModel)
        {
            return await _repo.CreateEvent(eventModel);
        }

        public async Task<List<Event>> getEvents()
        {
            return await _repo.getEvents();
        }

        public void Dispose()
        {
            _repo.Dispose();
        }
    }
}