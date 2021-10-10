using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointment.ViewModel.Models
{
    public class UsersViewModel
    {
        public int ID { get; set; }

        public string Email { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public System.DateTime CreatedOn { get; set; }

        public int ModifyBy { get; set; }

        public System.DateTime ModifyOn { get; set; }

        public int CreatedBy { get; set; }

        public string Name { get; set; }

        public string UserName { get; set; }
    }
}
