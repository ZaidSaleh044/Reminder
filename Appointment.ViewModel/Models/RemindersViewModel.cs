﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Appointment.ViewModel.Models
{
    public class RemindersViewModel
    {
        public int ID { get; set; }

        [Display(Name ="Title")]
        public string Name { get; set; }

        public string Email { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public string BirthDate { get; set; }

        public int? PositionID { get; set; }

        [Display(Name ="Activity")]
        public bool? IsActive { get; set; }

        public Byte[] Image { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [Display(Name = "Hiring Date")]
        public string StartDate { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [Display(Name = "End Date")]
        public string EndDate { get; set; } 

        public string BreifDescription { get; set; }

        public TimeSpan? Time { get; set; }

        public int? EmployeeID { get; set; }

        [DataType(DataType.Date)]
        public DateTime? CreatedOn { get; set; } = DateTime.Now;

        public int? ModifyBy { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ModifyOn { get; set; } = DateTime.Now;

        public int? CreatedBy { get; set; }

        [Display(Name ="Type")]
        public int? TypeID { get; set; }

        [Display(Name ="Reminder type")]
        public string TypeName { get; set; }

        public List<SelectListItem> Type { get; set; }

        public virtual PositionsViewModel Positions { get; set; }

        public virtual ICollection<lookupsViewModel> Lookups { get; set; }

        public string ImagePath { get; set; }

    }
}
