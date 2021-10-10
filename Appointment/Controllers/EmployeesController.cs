using Appointment.Business.ActiveDirectory;
using Appointment.Business.Interfaces;
using Appointment.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Appointment.Controllers
{
    public class EmployeesController : BaseController
    {
        // GET: Employees
        public ActionResult Index()
        {
            try
            {
                IEmployees employeesService = new EmployeesService();
                return View(employeesService.GetAllEmployees());
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public ActionResult Delete(int id)
        {
            try
            {
                IEmployees employeesService = new EmployeesService();
                employeesService.DeleteEmployee(id);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public ActionResult GetnewEmployeesFromActiveDirectory()
        {
            try
            {
                IActiveDirectory activeDirectoryService = new ActiveDirectoryService();
                activeDirectoryService.UpdateEmployeesFromActiveDirectory();
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}