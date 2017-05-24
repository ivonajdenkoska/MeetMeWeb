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
        [Required]
        public User User1;
        [Required]
        public User User2;
        [Required]
        public string Content;
        public DateTime Date;
        public bool Read;
    }
}