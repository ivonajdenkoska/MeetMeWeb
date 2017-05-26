using MeetMeWeb.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MeetMeWeb.Models;
using System.Threading.Tasks;
using System.Data.Entity.Infrastructure;
using System.Text;
using Microsoft.Owin.Logging;

namespace MeetMeWeb.Repositories
{
    public class MeetingRequestRepository : IMeetingRequestRepository
    {
        private MeetMeDbContext _context;

        public MeetingRequestRepository()
        {
            _context = new MeetMeDbContext();
        }
        public void createMeetingRequest(MeetingRequest meetingRequest)
        {
            
            _context.Entry(meetingRequest.User).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(meetingRequest.Meeting).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(meetingRequest).State = System.Data.Entity.EntityState.Added;

            var result = _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}