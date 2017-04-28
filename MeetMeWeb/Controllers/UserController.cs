using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
using System.Web.Http;
using System.Collections.Generic;

namespace MeetMeWeb.Controllers
{
    [Authorize]
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private IUserService _userService;
        private IConnectionService _connectionService;

        public UserController(IUserService userService, IConnectionService connectionService)
        {
            _userService = userService;
            _connectionService = connectionService;
        }
        // GET api/User?id=...
        [Route("")]
        public User GetById(string id)
        {
            User user = _userService.getUserById(id);
            return user;
        }

        // GET api/User/Get?username=...
        [Route("Get")]
        public User GetByUsername([FromUri]string username)
        {
            User user = _userService.getUserByUsername(username);
            return user;
        }

        // GET api/User/GetAll
        [Route("GetAll")]
        public List<User> getAll()
        {
            return _userService.getAll();
        }

        // GET api/User/GetConnection?user1=...&user2=...
        [Route("GetConnection")]
        public Connection GetConnection([FromUri]string user1, [FromUri]string user2)
        {
            var connection = _connectionService.getConnection(user1, user2);
            return connection;
        }
    }
}
