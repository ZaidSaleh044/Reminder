﻿using Appointment.Business.ActiveDirectory;
using Appointment.Business.Job;
using Appointment.ViewModel.Models;
using Ninject;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Logging;
using System.Diagnostics;

namespace Appointment
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
           AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            LoggingHelper.LogDebug(ConfigurationManager.AppSettings["SendEmailHour"].ToString());
            LoggingHelper.LogDebug(ConfigurationManager.AppSettings["SendEmailmin"].ToString());
            int StartHour = Convert.ToInt32(ConfigurationManager.AppSettings["SendEmailHour"].ToString()), Startmin = Convert.ToInt32(ConfigurationManager.AppSettings["SendEmailmin"].ToString());
            JobScheduler.StartM(StartHour, Startmin);

            int StartActiveDirectoryHour = Convert.ToInt32(ConfigurationManager.AppSettings["StartActiveDirectoryHour"].ToString()), StartActiveDirectorymin = Convert.ToInt32(ConfigurationManager.AppSettings["StartActiveDirectorymin"].ToString());
            Job.Start(StartActiveDirectoryHour, StartActiveDirectorymin);
            //  Dependency.Register();

        }
        //protected void Application_Error(object sender, EventArgs e)
        //{
        //    var ex = Server.GetLastError().GetBaseException();
        //}
        protected void Application_Error(object sender, EventArgs e)
        {

            ErrorObject oError = new ErrorObject();
            Exception oException = Server.GetLastError().GetBaseException();
            LoggingHelper.LogError(oException);
            Exception innerException = oException.InnerException;
            HttpException httpException = oException as HttpException;
            if (httpException == null && innerException != null)
            {
                httpException = innerException as HttpException;
            }
            Response.Clear();

            oError.ErrorMessage = oException.Message;
            //oError.FriendlyMessage = "Ooops!  There was a problem!";
            oError.HttpCode = (httpException != null) ? httpException.GetHttpCode() : 0;

            Server.ClearError();

            Response.RedirectToRoute("Error", oError);
        }

        private static void RegisterServecies()
        {
            Ninject.IKernel kernel = new StandardKernel();

            System.Web.Mvc.DependencyResolver.SetResolver(new Appointment.Business.Models.NinjectDependencyResolver(kernel));
        }

        protected void Application_End()
        {
            Process.Start(ConfigurationManager.AppSettings["RequestEXEPath"].ToString());
            LoggingHelper.LogInfo("Global.asax - Application_End Application Shutdown ");
        }
    }
}
