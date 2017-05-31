using MeetMeWeb.Repositories.Interfaces;
using System;
using System.Linq;
using MeetMeWeb.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MeetMeWeb.Repositories
{
    public class ConnectionRepository : IConnectionRepository
    {
        private MeetMeDbContext _context;

        public ConnectionRepository()
        {
            _context = new MeetMeDbContext();
        }

        public async Task<Connection> AcceptConnection(Connection connection)
        {
            connection.Status = Status.Accepted;
            connection.StartDate = DateTime.Now;
            _context.Entry(connection.User1).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection.User2).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection).State = System.Data.Entity.EntityState.Modified;
            var result = await _context.SaveChangesAsync();
            return connection;
        }

        public async Task<Connection> CreateConnection(Connection connection)
        {
            _context.Entry(connection.User1).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection.User2).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection).State = System.Data.Entity.EntityState.Added;
            var result = await _context.SaveChangesAsync();
            return connection;
        }

        public void DeleteConnection(Connection connection)
        {
            _context.Entry(connection.User1).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection.User2).State = System.Data.Entity.EntityState.Unchanged;
            _context.Entry(connection).State = System.Data.Entity.EntityState.Deleted;
            _context.SaveChanges();
        }

        public Connection GetConnection(string user1, string user2)
        {
            var connection = _context.Connections.Include("User1").Include("User2").Where(x => x.User1.Id == user1 && x.User2.Id == user2).FirstOrDefault();
            if(connection == null)
            {
                connection = _context.Connections.Include("User1").Include("User2").Where(x => x.User1.Id == user2 && x.User2.Id == user1).FirstOrDefault();
            }
            return connection;
        }

        public List<User> getFriends(string userName)
        {
            var rezultat = new List<User>();
            var prvDel = _context.Connections.Include("User1").Include("User2").Where(x => x.User1.UserName == userName).Select(x => x.User2).ToList();
            foreach(User u in prvDel) { rezultat.Add(u); }
            var vtorDel = _context.Connections.Include("User1").Include("User2").Where(x => x.User2.UserName == userName).Select(x=> x.User1).ToList();
            foreach (User u in vtorDel) { rezultat.Add(u); }
            return rezultat;
        }
    }
}