using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MeetMeWeb.Models
{
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid eventID { get; set; }
        public string eventName { get; set; }
        public string eventLocation { get; set; }
        public string eventStart { get; set; }
        public string eventEnd { get; set; }
        public string eventPriority { get; set; }
        public User user { get; set; }
    }
}