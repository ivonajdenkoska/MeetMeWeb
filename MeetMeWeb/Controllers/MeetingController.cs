using MeetMeWeb.Models;
using MeetMeWeb.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace MeetMeWeb.Controllers
{
    [Authorize]
    [RoutePrefix("api/Meeting")]
    public class MeetingController : ApiController
    {
        private IMeetingService _meetingService;
        private IMeetingRequestService _meetingRequestService;

        public MeetingController() { }
        public MeetingController(IMeetingService service,IMeetingRequestService meetingRequestService)
        {
            _meetingService = service;
            _meetingRequestService = meetingRequestService;
        }

        // POST api/Meeting/Create
        [Route("Create")]
        public MeetingModel CreateMeeting(MeetingModel meetingModel)
        {
            _meetingService.createMeeting(meetingModel);
            return meetingModel;
        }
        /*//POST api/Meeting/SendRequest
        [Route("Send")]
        public async Task<MeetingRequest> SendRequest(MeetingRequest meetingRequest)
        {
            MeetingRequest mr = _meetingRequestService.createMeetingRequest(meetingRequest);
            return mr;
        }*/

        [Route("Get")]
        public Meeting GetByTitle([FromUri]string title)
        {
            Meeting meeting = _meetingService.getByTitle(title);
            return meeting;
        }

        [Route("GetMeetingReq")]
        [HttpGet]
        public List<MeetingRequest> GetById(string id)
        {
            var result = _meetingService.getById(id);
            return result;
        }

        [Route("acceptmr")]
        [HttpPost]
        public void acceptMR(AcceptMR model)
        {
            _meetingService.acceptMR(model.meeting, model.user, model.id);
        }

        [Route("rejecttmr")]
        [HttpPost]
        public void rejectMR(AcceptMR model)
        {
            _meetingService.rejectMR(model.meeting, model.user, model.id);
        }

    }
}
