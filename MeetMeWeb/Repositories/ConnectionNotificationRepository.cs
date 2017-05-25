using MeetMeWeb.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MeetMeWeb.Models;

namespace MeetMeWeb.Repositories
{
    public class ConnectionNotificationRepository : IConnectionNotificationRepository
    {
        private MeetMeDbContext _context;

        public ConnectionNotificationRepository()
        {
            _context = new MeetMeDbContext();
        }
        public void createNotification(ConnectionNotification notification)
        {
            _context.Entry(notification.User1).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(notification.User2).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(notification).State = System.Data.Entity.EntityState.Added;
            var result = _context.SaveChanges();
        }
    }
}