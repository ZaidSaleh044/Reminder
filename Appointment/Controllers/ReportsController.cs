using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Appointment.Business.Models;
using Appointment.ViewModel.Models;
using Microsoft.Reporting.WebForms;
using static Appointment.Business.Models.ReportService;

namespace Appointment.Controllers
{
    public class ReportsController : BaseController
    {

        [HttpGet]
        public ActionResult RemindersDistribution()
        {
            ViewBag.Type = ReportService.GetTypeID();
            return View();
        }

        [HttpGet]
        public ActionResult ReminderReport()
        {
            return View();
        }

        // GET: /Report/
        [HttpPost]
        public ActionResult RemindersDistribution(ReportsViewModel rvm, string yearpicker)
        {

            List<ReportParameter> p = new List<ReportParameter>();

            var b = rvm.SelectedType;
            var type = ReportService.GetCodeForTypeID(b);
            p.Add(new ReportParameter("P_TypeID", type.ToString(), false));


            p.Add(new ReportParameter("P_Year", rvm.year, false));
            ViewBag.ReportViewer = GetparamReport("Reminders Distribution", p);


            return View("Index");


        }
        [HttpPost]
        public ActionResult ReminderReport(ReportsViewModel rvm)
        {

            var startDate = DateTime.Parse(rvm.StartDate.Split('/')[1]+ "/"+rvm.StartDate.Split('/')[0]+ "/" + rvm.StartDate.Split('/')[2]).Date;
            var endDate = DateTime.Parse(rvm.EndDate.Split('/')[1] + "/" + rvm.EndDate.Split('/')[0] + "/" + rvm.EndDate.Split('/')[2]).Date;
            List<ReportParameter> p = new List<ReportParameter>();
            p.Add(new ReportParameter("P_Name", rvm.Name, false));//.ToString()
            p.Add(new ReportParameter("P_StartDate", startDate.ToString("MM/dd/yyyy"), false));//
            p.Add(new ReportParameter("P_EndDate", endDate.ToString("MM/dd/yyyy"), false));//.Date.ToString("dd/MM/yyyy")
            p.Add(new ReportParameter("P_ID", "", false));

            ViewBag.ReportViewer = GetparamReport("RemindersReport", p);
            return View("Index");

        }

       

    }


}