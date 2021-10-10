using Appointment.Business.Interfaces;
using Appointment.DAL.Models;
using Appointment.ViewModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointment.Business.Models
{
    public class EmployeesService : IEmployees
    {
        public List<EmployeesViewModel> GetAllEmployees()
        {
            try
            {
                List<EmployeesViewModel> employees = new List<EmployeesViewModel>();
                using (RemindersEntities db = new RemindersEntities())
                {
                    var lstEmployees = db.Employees.Where(x=>x.IsActive==true).ToList();
                    foreach (var employee in lstEmployees)
                    {
                        employees.Add(new EmployeesViewModel
                        {
                            ID = employee.ID,
                            Name = employee.Name,
                            BirthDate = employee.BirthDate.ToString(),
                            Email = employee.Email,
                            IsActive = employee.IsActive.Value,
                            CreatedOn = employee.CreatedOn.Value,
                            CreatedBy = employee.CreatedBy,
                            ModifyOn = employee.ModifyOn,
                            ModifyBy = employee.ModifyBy
                        });
                    }
                }
                return employees.OrderBy(x=>x.Name).ToList();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public void DeleteEmployee(int id)
        {
            try
            {
                using (RemindersEntities db = new RemindersEntities())
                {
                    var employee = db.Employees.Find(id);
                    employee.IsActive = false;
                    var reminder = db.Reminders.Where(x=>x.EmployeeID==id).FirstOrDefault();
                    if (reminder != null)
                        reminder.IsActive = false;
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
