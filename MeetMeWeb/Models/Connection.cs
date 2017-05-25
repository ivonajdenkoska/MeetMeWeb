using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetMeWeb.Models
{
    public class Connection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        public User User1 { get; set; }
        public User User2 { get; set; }
        [Required]
        public Status Status { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
    }

    public enum Status
    {
        Waiting, Accepted
    }
}