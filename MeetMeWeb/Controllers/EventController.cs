using MeetMeWeb.Models;
using MeetMeWeb.Services;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MeetMeWeb.Controllers
{
    [Authorize]
    [RoutePrefix("api/Event")]
    public class EventController : ApiController
    {
        private EventService _service = null;

        public EventController()
        {
            _service = new EventService();
        }

        // POST api/Event/Create
        [AllowAnonymous]
        [Route("Create")]
        public async Task<Event> CreateEvent(Event eventModel)
        {
            Event e = await _service.createEvent(eventModel);
            return e;
        }

        // GeET api/Event/GetEvents
        [AllowAnonymous]
        [Route("getEvents")]
        public async Task<List<Event>> getEvents()
        {
            List<Event> events = await _service.getEvents();
            return events;
        }
    }
}
