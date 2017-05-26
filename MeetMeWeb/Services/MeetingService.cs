using MeetMeWeb.Services.Interfaces;
using System;
using MeetMeWeb.Models;
using System.Threading.Tasks;
using MeetMeWeb.Repositories.Interfaces;

namespace MeetMeWeb.Services
{
    public class MeetingService : IMeetingService
    {
        private IMeetingRepository _repository;
        public MeetingService(IMeetingRepository repository)
        {
            _repository = repository;
        }
        public async Task<Meeting> createMeeting(Meeting meetingModel)
        {
            return await _repository.CreateMeeting(meetingModel);
        }

        public Meeting getByTitle(string title)
        {
            return _repository.getByTitle(title);
        }

        public void Dispose()
        {
            _repository.Dispose();
        }

    }
}