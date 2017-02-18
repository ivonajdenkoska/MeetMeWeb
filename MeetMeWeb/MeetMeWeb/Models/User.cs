using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MeetMeWeb.Models
{
    public class User
    {
        public Guid ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}