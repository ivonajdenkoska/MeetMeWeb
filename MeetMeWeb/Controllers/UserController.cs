using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
using Microsoft.AspNet.Identity;
using System;
using System.Web;
using System.Web.Http;

namespace MeetMeWeb.Controllers
{
    [Authorize]
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }
        // GET api/User/{id}
        [Route("{id}")]
        public User GetById(Guid id)
        {
            User user = _service.getUserById(id);
            return user;
        }

        // GET api/User/Get?username=...
        [Route("Get")]
        public User GetByUsername([FromUri]string username)
        {
            User user = _service.getUserByUsername(username);
            return user;
        }
    }
}
