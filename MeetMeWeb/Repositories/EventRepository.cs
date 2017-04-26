using MeetMeWeb.Models;
using MeetMeWeb.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

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
            _context.Entry(eventModel.User).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(eventModel).State = System.Data.Entity.EntityState.Added;
            var result = await _context.SaveChangesAsync();

            return eventModel;
        }

        public async Task<Event> DeleteEvent(string title,Guid id)
        {
            Event toDelete = (Event)_context.Events.SingleOrDefault(o => o.Title == title && o.ID == id);
            _context.Events.Remove(toDelete);
            _context.SaveChanges();
            return toDelete;
        }

        public List<Event> getEvents(string username)
        {

            return _context.Events.Where(o => o.User.UserName == username).ToList();
        }
        public void Dispose()
        {
            _context.Dispose();
        }

    }
}