using MeetMeWeb.Models;
using System.Collections.Generic;

namespace MeetMeWeb.Repositories.Interfaces
{
    public interface IConnectionNotificationRepository
    {
        void createNotification(ConnectionNotification notification);
        List<ConnectionNotification> getConnectionNotifications(string userId, int startPostion, int size);
        void readConnestionNotification(ConnectionNotification notification);
    }
}
