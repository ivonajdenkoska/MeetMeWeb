using MeetMeWeb.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MeetMeWeb.Models;
using System.Threading.Tasks;
using MeetMeWeb.Repositories.Interfaces;

namespace MeetMeWeb.Services
{
    public class MeetingRequestService : IMeetingRequestService
    {
        private IMeetingRequestRepository _repository;

        public MeetingRequestService(IMeetingRequestRepository repository)
        {
            _repository = repository;
        }

        public void createMeetingRequest(MeetingRequest meetingRequest)
        {
            _repository.createMeetingRequest(meetingRequest);
        }

        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}