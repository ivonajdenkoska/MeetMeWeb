using MeetMeWeb.Models;
using MeetMeWeb.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Data.Entity.Migrations;

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

        public async Task<Event> DeleteEvent(string title,Guid id, string username)
        {
            Event toDelete = (Event)_context.Events.SingleOrDefault(o => o.Title == title && o.ID == id);
            Meeting meetingToDelete = _context.Meetings.Include("creator").Where(x => x.Title == title).SingleOrDefault();
            List<Event> eventsToDelete = _context.Events.Where(x => x.Title == title).ToList();
            if (meetingToDelete == null)
            {
                _context.Events.Remove(toDelete);
                _context.SaveChanges();
            }
            else
            {
               // _context.Events.Remove(toDelete);
               // _context.SaveChanges();
                if (meetingToDelete.creator.UserName == username)
                {
                    List<MeetingRequest> mrLista = _context.MeetingRequests.Where(x => x.Meeting.ID == meetingToDelete.ID).ToList();
                    foreach(MeetingRequest m in mrLista)
                    {
                        _context.MeetingRequests.Remove(m);
                    }
                    foreach (Event e in eventsToDelete)
                    {
                        _context.Events.Remove(e);
                    }
                    _context.Meetings.Remove(meetingToDelete);
                    _context.SaveChanges();
                }
                else
                {
                    _context.Events.Remove(toDelete);
                    _context.SaveChanges();
                }
            }
            return toDelete;
        }

        public Event EditEvent(string title, Guid id, DateTime start, DateTime end)
        {
            Event toUpdate = _context.Events.Find(id);
            toUpdate.Title = title;
            toUpdate.Start = start;
            toUpdate.End = end;
            try
            {
                _context.SaveChanges();
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting
                        // the current instance as InnerException
                        raise = new InvalidOperationException(message, raise);
                    }
                }
            }
            return toUpdate;
        }

        public List<Event> getEvents(string username)
        {

            return _context.Events.Include("MR").Where(o => o.User.UserName == username).ToList();
        }
        public void Dispose()
        {
            _context.Dispose();
        }

    }
}