﻿//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using System.Web.UI.WebControls;
//using System.Web.Mvc;

//namespace Appointment.ViewModel.Models
//{
//    public class EmployeeRemindersViewModel
//    {

//        [Key]
//        public int ID { get; set; }

//        [StringLength(50)]
//        [Required(ErrorMessage = "Name is required")]
//        [Display(Name ="Title")]
//        public string Name { get; set; }


//        public Byte[] Image { get; set; }

//        [StringLength(30)]
//        [Required(ErrorMessage = "Email is required")]
//        [DataType(DataType.EmailAddress, ErrorMessage = "E-mail is not valid")]
//        public string Email { get; set; }

//        [Required(ErrorMessage = "Birthday is required")]
//        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/mm/yyyy}")]
//        //[DataType(DataType.DateTime,)]
//        [Editable(false)]
//        [Display(Name = "Birth Date")]
//        public DateTime? BirthDate { get; set; }

//        [Required(ErrorMessage = "Start Date is required")]
//        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
//        [Display(Name = "Start Date")]
//        public DateTime? StartDate { get; set; }

//        [Required(ErrorMessage = "Position is required")]
//        [Display(Name = "Position")]
//        public int? PositionID { get; set; }

//        public string Position { get; set; }

//        public string Group { get; set; }

//        [Display(Name = "Activity")]
//        public bool IsActive { get; set; }

//        [DataType(DataType.Date)]
//        public DateTime? CreatedOn { get; set; } 

//        [DataType(DataType.Date)]
//        public DateTime? ModifyOn { get; set; } 



//        public int? ModifyBy { get; set; } 

//        public int? CreatedBy { get; set; }

//        public int? TypeID { get; set; }


//        public string ImagePath { get; set; }

//        [Required(ErrorMessage = "Employee is required")]
//        [Display(Name = "Employee")]
//        public int? EmployeeID { get; set; }


//        public List<SelectListItem> Employees { get; set; }


//        public List<SelectListItem> Positions { get; set; }

//        public List<string> SelectedGroups { get; set; }


//        public List<SelectListItem> Groups { get; set; }

//        [Required(ErrorMessage ="Choose at least one group")]
//        public int[] SelectedGroupsID { get; set; }

//    }
//}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using System.Web.Mvc;

namespace Appointment.ViewModel.Models
{
    public class EmployeeRemindersViewModel
    {

        [Key]
        public int ID { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Name is required")]
        [Display(Name = "Title")]
        public string Name { get; set; }


        public Byte[] Image { get; set; }

        [StringLength(30)]
        [Required(ErrorMessage = "Email is required")]
        [DataType(DataType.EmailAddress, ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Birthday is required")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        [Display(Name = "Birth Date")]
        public string BirthDate { get; set; }

        [Required(ErrorMessage = "Start Date is required")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        [Display(Name = "Hiring Date")]
        public string StartDate { get; set; }

        [Required(ErrorMessage = "Position is required")]
        [Display(Name = "Position")]
        public int? PositionID { get; set; }

        public string Position { get; set; }

        public string Group { get; set; }

        [Display(Name = "Activity")]
        public bool IsActive { get; set; }

        [DataType(DataType.Date)]
        public DateTime? CreatedOn { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ModifyOn { get; set; }



        public int? ModifyBy { get; set; }

        public int? CreatedBy { get; set; }

        public int? TypeID { get; set; }


        public string ImagePath { get; set; }

        [Required(ErrorMessage = "Employee is required")]
        [Display(Name = "Employee")]
        public int? EmployeeID { get; set; }


        public List<SelectListItem> Employees { get; set; }


        public List<SelectListItem> Positions { get; set; }

        public List<string> SelectedGroups { get; set; }


        public List<SelectListItem> Groups { get; set; }

        [Required(ErrorMessage = "Choose at least one group")]
        public int[] SelectedGroupsID { get; set; }

    }
}

