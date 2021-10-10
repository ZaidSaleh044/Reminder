﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointment.DAL.Models
{
    public class Users
    {
        public int ID { get; set; }

        public string Email { get; set; }

        public string CreatedOn { get; set; }

        public int? ModifyBy { get; set; }

        public DateTime? ModifyOn { get; set; }

        public int? CreatedBy { get; set; }

        public string Name { get; set; }

        public string UserName { get; set; }

    }
}
