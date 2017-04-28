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
        [Required]
        public User user1;
        [Required]
        public User user2;
        [Required]
        public Status status;
    }

    public enum Status
    {
        Waiting, Accepted
    }
}