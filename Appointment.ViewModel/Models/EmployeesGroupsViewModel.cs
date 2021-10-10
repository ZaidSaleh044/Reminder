﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Appointment.ViewModel.Models
{
    public class EmployeesGroupsViewModel
    {
        [Key]
        public int ID { get; set; }
        public int? EmployeeID { get; set; }
        public int GroupID { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<int> ModifyBy { get; set; }
        public Nullable<System.DateTime> ModifyOn { get; set; }
        public Nullable<int> CreatedBY { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Name is required!!")]
        public string Name { get; set; }
        
        public virtual EmployeesViewModel Employee { get; set; }
        public virtual GroupsViewModel Groups { get; set; }

       
        public List<EmployeesViewModel> Employeelist { get; set; }
        //[Required(ErrorMessage = "Select at least one Employee")]
        [Required(ErrorMessage = " Please Select at least one employee!!")]
        public  int[] SelectedEmployeesID { get; set; }
        public List<SelectListItem> Employees { get; set; }
        //public List <EmployeesGrupsViewModel> EmployeesGroupViewModel { get; set; }


    }
}
