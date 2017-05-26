using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MeetMeWeb.Models
{
    public class MeetingRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        public User User { get; set; }
        public Meeting Meeting { get; set; }
        public string Content { get; set; }
        public bool Status { get; set; }
    }
}