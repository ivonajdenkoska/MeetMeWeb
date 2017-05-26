using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MeetMeWeb.Models
{
    public class MeetingModel
    {
        [Required]
        public string Title { get; set; }
        public string Location { get; set; }
        [Required]
        public DateTime Start { get; set; }
        [Required]
        public DateTime End { get; set; }
        [Required]
        public PrioritiesY Priority { get; set; }
        public User creator { get; set; }
        public List<User> participants { get; set; }

    }
}