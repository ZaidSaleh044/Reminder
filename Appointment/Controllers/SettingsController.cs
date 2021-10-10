﻿using Appointment.Business.Job;
using Appointment.Business.Models;
using Appointment.ViewModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Appointment.Controllers
{
    public class SettingsController : BaseController
    {
        [UserRoleAuthorize(Roles = "Admin")]
        public ActionResult Index()
        {

            //JobScheduler.Start();
            SettingsViewModel obj = new SettingsViewModel();
            obj.settingsView = new SettingsView();

            ViewBag.AdminEmail = SettingService.EmailAdmin();
            ViewBag.BirthdayEmailText = SettingService.BirthDayEmailText();
            ViewBag.AnniversaryEmailText = SettingService.AnniversaryEmailText();
            ViewBag.BirthdayReminder = SettingService.BirthdayReminderEN();
            ViewBag.AnniversaryReminder = SettingService.AnniversaryReminderEN();
            ViewBag.EventReminder = SettingService.EventReminderEN();
            ViewBag.SendBirthday = SettingService.SendBirthdayEN();
            ViewBag.SendAnniversary = SettingService.SendAnniversaryEN();
            ViewBag.SendEvent = SettingService.SendEventEN();
            ViewBag.UpComingReminder = SettingService.UpComingReminderEN();
            ViewBag.BirthdayImagePath = SettingService.BirthdayImgPath();
            ViewBag.AnniversaryImagePath = SettingService.AnniversaryImgPath();
            return View();
            //return null;
        }





        // GET: Settings
        [HttpGet]
        [UserRoleAuthorize(Roles = "Admin")]
        public ActionResult Edit()
        {
            
            SettingsViewModel obj = new SettingsViewModel();
            obj.settingsView = new SettingsView();
            obj.settingsView.BirthDayEmailText = SettingService.BirthDayEmailText();
            obj.settingsView.AnniversaryEmailText = SettingService.AnniversaryEmailText();
            obj.settingsView.EmailAdmin = SettingService.EmailAdmin();

            //-----------------------get item selected value------------------------//
            obj.BirthdayReminderID = Convert.ToInt32(SettingService.BirthdayReminderID());
            obj.AnniversaryReminderID = Convert.ToInt32(SettingService.AnniversaryReminderID());
            obj.EventReminderID = Convert.ToInt32(SettingService.EventReminderID());
            obj.SendBirthdayID = Convert.ToInt32(SettingService.SendBirthdayID());
            obj.SendAnniversaryID = Convert.ToInt32(SettingService.SendAnniversaryID());
            obj.SendEventID = Convert.ToInt32(SettingService.SendEventID());
            obj.UpComingReminderID = Convert.ToInt32(SettingService.UpComingReminderID());



            //--------------get list data from database(lookup table)--------------//

            obj.BirthdayReminder = SettingService.GetDayBefore();
            obj.AnniversaryReminder = SettingService.GetDayBefore();
            obj.EventReminder = SettingService.GetDayBefore();
            obj.SendBirthday = SettingService.GetDayBefore();
            obj.SendAnniversary = SettingService.GetDayBefore();
            obj.SendEvent = SettingService.GetDayBefore();
            obj.UpComingReminder = SettingService.GetUpcoming();
            obj.BirthdayImagePath = SettingService.BirthdayImgPath();
            obj.AnniversaryImagePath = SettingService.AnniversaryImgPath();


            return View(obj);
          
        }
        [HttpPost]
        [UserRoleAuthorize(Roles = "Admin")]
        public ActionResult Edit(SettingsViewModel sv, HttpPostedFileBase birthdayImage, HttpPostedFileBase anniversaryImage)
        {
            if (ModelState.IsValid)
            {
                if (birthdayImage != null)
                {
                    string imgName = DateTime.Now.ToString("yyyyMMddhhmmss") + birthdayImage.FileName;


                    string ImagePathphiscal = AppDomain.CurrentDomain.BaseDirectory + "img\\" + imgName;
                    birthdayImage.SaveAs(ImagePathphiscal);
                    sv.BirthdayImagePath = "~/img/" + imgName;
                }
                if (anniversaryImage != null)
                {
                    string imgName = DateTime.Now.ToString("yyyyMMddhhmmss") + anniversaryImage.FileName;


                    string ImagePathphiscal = AppDomain.CurrentDomain.BaseDirectory + "img\\" + imgName;
                    anniversaryImage.SaveAs(ImagePathphiscal);
                    sv.AnniversaryImagePath = "~/img/" + imgName;
                }
                SettingService.Save(sv);
            }
           
                
           
            return RedirectToAction("Index","Settings");
        }
    }
}