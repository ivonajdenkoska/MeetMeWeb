using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace MeetMeWeb.Controllers
{
    [Authorize]
    [RoutePrefix("api/Event")]
    public class EventController : ApiController
    {
        private IEventService _userService;

        public EventController(IEventService service)
        {
            _userService = service;
        }

        // POST api/Event/Create
        [Route("Create")]
        public async Task<Event> CreateEvent(Event eventModel)
        {
            Event e = await _userService.createEvent(eventModel);
            return e;
        }

        // POST api/Event/Delete
        [Route("Delete")]
        [HttpPost]
        public async Task<Event> DeleteEvent(string title,Guid id)
        {
            Event e = await _userService.deleteEvent(title,id);
            return e;
        }

        // POST api/Event/Edit
        [Route("Edit")]
        public Event EditEvent(string title, Guid id,DateTime start,DateTime end)
        {
            Event e = _userService.editEvent(title, id, start, end);
            return e;
        }

        // GET api/Event/GetEvents
        [Route("getEvents")]
        public List<Event> getEvents([FromUri] string username)
        {
            List<Event> events =_userService.getEvents(username);
            return events;
        }
    }
}
