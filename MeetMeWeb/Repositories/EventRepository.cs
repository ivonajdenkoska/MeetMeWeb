using MeetMeWeb.Models;
using MeetMeWeb.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories
{
    public class EventRepository: IEventRepository
    {
        private MeetMeDbContext _context;

        public EventRepository()
        {
            _context = new MeetMeDbContext();
        }

        public async Task<Event> CreateEvent(Event eventModel)
        {
            _context.Events.Add(eventModel);
            await _context.SaveChangesAsync();

            return eventModel;
        }

        public async Task<List<Event>> getEvents()
        {

            return _context.Events.ToList();
        }
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}