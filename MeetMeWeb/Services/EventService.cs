using MeetMeWeb.Models;
using MeetMeWeb.Repositories.Interfaces;
using MeetMeWeb.Services.Interfaces;
using System.Threading.Tasks;

namespace MeetMeWeb.Services
{
    public class EventService : IEventService
    {
        private IEventRepository _repo;

        public EventService(IEventRepository repo)
        {
            _repo = repo;
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