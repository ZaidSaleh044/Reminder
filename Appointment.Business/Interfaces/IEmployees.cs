using Appointment.ViewModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointment.Business.Interfaces
{
    public interface IEmployees
    {
        List<EmployeesViewModel> GetAllEmployees();
        void DeleteEmployee(int id);
    }
}
