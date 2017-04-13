using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
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

        // GET api/Event/GetEvents
        [Route("getEvents")]
        public async Task<List<Event>> getEvents()
        {
            List<Event> events = await _service.getEvents();
            return events;
        }
    }
}
