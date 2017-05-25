using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetMeWeb.Models
{
    public class ConnectionNotification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        public User User1{get;set;}
        [Required]
        public User User2{get;set;}
        [Required]
        public string Content{get;set;}
        [Required]
        public DateTime Date { get; set; }
        public bool Read { get; set; }
    }
}