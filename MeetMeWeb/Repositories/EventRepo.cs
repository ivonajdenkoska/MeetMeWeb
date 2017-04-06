using MeetMeWeb.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MeetMeWeb.Repositories
{
    public class EventRepo : IDisposable
    {
        private MeetMeDbContext _context;

        public EventRepo()
        {
            _context = new MeetMeDbContext();
        }

        public async Task<Event> CreateEvent(Event eventModel)
        {
            /* Event user = new User
             {
                 Email = userModel.Email,
                 FirstName = userModel.FirstName,
                 LastName = userModel.LastName,
                 UserName = userModel.Email,
                 BirthDate = DateTime.Now
             };
             */
            _context.Events.Add(eventModel);
            _context.SaveChanges();

            return eventModel;
        }
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}