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
        private IEventService _service;

        public EventController(IEventService service)
        {
            _service = service;
        }

        // POST api/Event/Create
        [Route("Create")]
        public async Task<Event> CreateEvent(Event eventModel)
        {
            Event e = await _service.createEvent(eventModel);
            return e;
        }

        // POST api/Event/Delete
        [Route("Delete")]
        [HttpPost]
        public async Task<Event> DeleteEvent(string title,Guid id)
        {
            Event e = await _service.deleteEvent(title,id);
            return e;
        }

        // POST api/Event/Edit
        [Route("Edit")]
        public Event EditEvent(string title, Guid id,DateTime start,DateTime end)
        {
            Event e = _service.editEvent(title, id, start, end);
            return e;
        }

        // GET api/Event/GetEvents
        [Route("getEvents")]
        public List<Event> getEvents([FromUri] string username)
        {
            List<Event> events =_service.getEvents(username);
            return events;
        }
    }
}
