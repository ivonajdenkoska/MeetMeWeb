using MeetMeWeb.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using MeetMeWeb.Models;

namespace MeetMeWeb.Repositories
{
    public class MeetingRepository : IMeetingRepository
    {
        private MeetMeDbContext _context;
        public MeetingRepository()
        {
            _context = new MeetMeDbContext();
        }
        public Meeting CreateMeeting(Meeting meetingModel)
        {
            _context.Entry(meetingModel.creator).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(meetingModel).State = System.Data.Entity.EntityState.Added;
            _context.SaveChanges();
            return _context.Meetings.SingleOrDefault(x => x.Title == meetingModel.Title);
        }

        public Meeting getByTitle(string title)
        {
            return _context.Meetings.Single(x => x.Title == title);
        }

        public void Dispose()
        {
            _context.Dispose();
        }

    }
}