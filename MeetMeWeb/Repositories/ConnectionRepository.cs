using MeetMeWeb.Repositories.Interfaces;
using System;
using System.Linq;
using MeetMeWeb.Models;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories
{
    public class ConnectionRepository : IConnectionRepository
    {
        private MeetMeDbContext _context;

        public ConnectionRepository()
        {
            _context = new MeetMeDbContext();
        }

        public async void AcceptConnection(string user1, string user2)
        {
            var connection = _context.Connections.Where(x => x.User1.Id == user1 && x.User2.Id == user2).FirstOrDefault();
            connection.Status = Status.Accepted;
            connection.StartDate = DateTime.Now;
            _context.Entry(connection.User1).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection.User2).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection).State = System.Data.Entity.EntityState.Modified;
            var result = await _context.SaveChangesAsync();
        }

        public async Task<Connection> CreateConnection(Connection connection)
        {
            _context.Entry(connection.User1).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection.User2).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection).State = System.Data.Entity.EntityState.Added;
            var result = await _context.SaveChangesAsync();
            return connection;
        }

        public void DeleteConnection(string user1, string user2)
        {
            var connection = _context.Connections.Where(x => x.User1.Id == user1 && x.User2.Id == user2).SingleOrDefault();
            if(connection == null)
                connection = _context.Connections.Where(x => x.User1.Id == user2 && x.User2.Id == user1).SingleOrDefault();
            _context.Connections.Remove(connection);
            _context.SaveChanges();
        }

        public Connection GetConnection(string user1, string user2)
        {
            var connection = _context.Connections.Local.Where(x => x.User1.Id == user1 && x.User2.Id == user2).SingleOrDefault();
            if(connection == null)
            {
                connection = _context.Connections.Local.Where(x => x.User1.Id == user2 && x.User2.Id == user1).SingleOrDefault();
            }
            if (connection == null)
            {
                connection = _context.Connections.Where(x => x.User1.Id == user1 && x.User2.Id == user2).SingleOrDefault();
            }
            if(connection == null)
            {
                connection = _context.Connections.Where(x => x.User1.Id == user2 && x.User2.Id == user1).SingleOrDefault();
            }
            return connection;
        }
    }
}