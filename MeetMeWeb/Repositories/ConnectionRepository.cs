using MeetMeWeb.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MeetMeWeb.Models;

namespace MeetMeWeb.Repositories
{
    public class ConnectionRepository : IConnectionRepository
    {
        private MeetMeDbContext _context;

        public ConnectionRepository()
        {
            _context = new MeetMeDbContext();
        }

        public Connection getConnection(string user1, string user2)
        {
            var connection = _context.Connections.Local.Where(x => x.user1.Id == user1 && x.user2.Id == user2).SingleOrDefault();
            if(connection == null)
            {
                connection = _context.Connections.Where(x => x.user1.Id == user1 && x.user2.Id == user2).SingleOrDefault();
            }
            return connection;
        }
    }
}