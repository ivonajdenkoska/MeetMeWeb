using MeetMeWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IMeetingRepository: IDisposable
    {
        Meeting CreateMeeting(Meeting meetingModel);
        Meeting getByTitle(string title);
        List<MeetingRequest> getById(string guid);
        void acceptMR(Meeting meeting, User user, string id);
        void rejectMR(Meeting meeting, User user, string id);
        List<Event> getParticipants(string title, DateTime start, DateTime end, string location, PrioritiesY priority);
    }
}
