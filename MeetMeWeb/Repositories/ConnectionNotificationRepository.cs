using MeetMeWeb.Repositories.Interfaces;
using MeetMeWeb.Models;
using System.Collections.Generic;
using System.Linq;

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

        public List<ConnectionNotification> getConnectionNotifications(string userId, int startPostion, int size)
        {
            return _context.ConnectionNotifications.Include("User1").Where(x => x.User2.Id == userId).OrderByDescending(x => x.Date).Skip(startPostion).Take(size).ToList();
        }
    }
}