using MeetMeWeb.Services.Interfaces;
using System;
using MeetMeWeb.Models;
using System.Threading.Tasks;
using MeetMeWeb.Repositories.Interfaces;
using System.Collections.Generic;

namespace MeetMeWeb.Services
{
    public class MeetingService : IMeetingService
    {
        private IMeetingRepository _repository;
        private IMeetingRequestRepository _repositoryMR;
        public MeetingService(IMeetingRepository repository, IMeetingRequestRepository repositoryMR)
        {
            _repository = repository;
            _repositoryMR = repositoryMR;
        }
        public void createMeeting(MeetingModel meetingModel)
        {
            var meeting = new Meeting { Title = meetingModel.Title, Start = meetingModel.Start, End = meetingModel.End, Location = meetingModel.Location, Priority = meetingModel.Priority, creator = meetingModel.creator };
            var result= _repository.CreateMeeting(meeting);
            foreach(var participant in meetingModel.participants)
            {
                var notification = new MeetingRequest { Meeting = result, Content = "Do you want to accept request for " + meetingModel.Title, Status = false, User=participant };
                _repositoryMR.createMeetingRequest(notification);
            }
        }

        public Meeting getByTitle(string title)
        {
            return _repository.getByTitle(title);
        }

        public List<MeetingRequest> getById(string id)
        {
            return _repository.getById(id);
        }

        public void acceptMR(Meeting meeting,User user, string id)
        {
            _repository.acceptMR(meeting, user, id);
        }

        public void rejectMR(Meeting meeting, User user, string id)
        {
            _repository.rejectMR(meeting, user, id);
        }

        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}