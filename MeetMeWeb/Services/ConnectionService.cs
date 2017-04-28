using MeetMeWeb.Repositories.Interfaces;
using MeetMeWeb.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MeetMeWeb.Models;

namespace MeetMeWeb.Services
{
	public class ConnectionService : IConnectionService
	{
        private IConnectionRepository _repo;

        public ConnectionService(IConnectionRepository repo)
        {
            _repo = repo;
        }

        public Connection getConnection(string user1, string user2)
        {
            return _repo.getConnection(user1, user2);
        }
    }
}