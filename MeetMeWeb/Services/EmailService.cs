using Microsoft.AspNet.Identity;
using System.Configuration;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MeetMeWeb.Services
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            var emailAddress = ConfigurationManager.AppSettings["emailService:EmailAddress"];
            var password = ConfigurationManager.AppSettings["emailService:Password"];
            var emailHost = ConfigurationManager.AppSettings["emailService:EmailHost"];
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(emailAddress, "SmartSet");
            mailMessage.To.Add(emailAddress);
            mailMessage.Subject = message.Subject;
            mailMessage.Body = message.Body;
            mailMessage.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = emailHost;
            smtp.Credentials = new System.Net.NetworkCredential(emailAddress, password);
            smtp.EnableSsl = true;
            return smtp.SendMailAsync(mailMessage);
        }
    }
}