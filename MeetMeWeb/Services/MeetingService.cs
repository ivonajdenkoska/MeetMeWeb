using MeetMeWeb.Services.Interfaces;
using System;
using MeetMeWeb.Models;
using System.Threading.Tasks;

namespace MeetMeWeb.Services
{
    public class MeetingService : IMeetingService
    {
        public Task<Meeting> createMeeting(Meeting meetingModel)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}