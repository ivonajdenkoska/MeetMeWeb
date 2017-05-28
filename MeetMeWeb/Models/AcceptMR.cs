using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MeetMeWeb.Models
{
    public class AcceptMR
    {
        public Meeting meeting { get; set; }
        public User user { get; set; }
        public string id { get; set; }
    }
}