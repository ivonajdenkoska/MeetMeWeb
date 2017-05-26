using MeetMeWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IMeetingRequestRepository:IDisposable
    {
        Task<MeetingRequest> createMeetingRequest(MeetingRequest meetingRequest);
    }
}
