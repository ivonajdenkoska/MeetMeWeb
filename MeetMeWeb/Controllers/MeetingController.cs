using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
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
    [RoutePrefix("api/Meeting")]
    public class MeetingController : ApiController
    {
        private IMeetingService _meetingService;
        public MeetingController(IMeetingService service)
        {
            _meetingService = service;
        }

        // POST api/Meeting/Create
        [Route("Create")]
        public async Task<Meeting> CreateMeeting(Meeting eventModel)
        {
            Meeting m = await _meetingService.createMeeting(eventModel);
            return m;
        }
    }
}
