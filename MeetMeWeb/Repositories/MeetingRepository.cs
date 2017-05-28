﻿using MeetMeWeb.Repositories.Interfaces;
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

        public List<MeetingRequest> getById(string guid)
        {
          //  return _context.MeetingRequests.Where(x => x.User.Id == guid).ToList();
            return _context.MeetingRequests.Include("Meeting").Include("User").Where(x => x.User.Id == guid && x.Status==false).ToList();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void acceptMR(Meeting meeting, User user, string id)
        {
            Event e=new Event { Title =meeting.Title, Start = meeting.Start, End = meeting.End, Location = meeting.Location, Priority = meeting.Priority, User = user};
            _context.Entry(e.User).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(e).State = System.Data.Entity.EntityState.Added;
            _context.SaveChanges();
            MeetingRequest mr=_context.MeetingRequests.SingleOrDefault(x => x.ID.ToString() == id);
            mr.Status = true;
            _context.SaveChanges();
        }

        public void rejectMR(Meeting meeting, User user, string id)
        {
            MeetingRequest mr = _context.MeetingRequests.SingleOrDefault(x => x.ID.ToString() == id);
            _context.MeetingRequests.Remove(mr);
            _context.SaveChanges();
        }
    }
}