﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Appointment.ViewModel.Models
{
    public class SettingsViewModel
    {
        public int ID { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }

        public DateTime CreatedOn { get; set; }

        public int? ModifyBy { get; set; }

        public DateTime? ModifyOn { get; set; }

        public int? CreatedBy { get; set; }

        public string Description { get; set; }

        public bool? IsPrivate { get; set; }
        public string BirthdayImagePath { get; set; }
        public string AnniversaryImagePath { get; set; }


        public List<SelectListItem> BirthdayReminder { get; set; }
        public int BirthdayReminderID { get; set; }

        public List<SelectListItem> AnniversaryReminder { get; set; }
        public int AnniversaryReminderID { get; set; }

        public List<SelectListItem> EventReminder { get; set; }
        public int EventReminderID { get; set; }

        public List<SelectListItem> SendBirthday { get; set; }
        public int SendBirthdayID { get; set; }

        public List<SelectListItem> SendAnniversary { get; set; }
        public int SendAnniversaryID { get; set; }

        public List<SelectListItem> SendEvent { get; set; }
        public int SendEventID { get; set; }

        public List<SelectListItem> UpComingReminder { get; set; }
        public int UpComingReminderID { get; set; }


        public lookupsViewModel LookupsViewModel { get; set; }
        public SettingsView settingsView { get; set; }
    }
}
