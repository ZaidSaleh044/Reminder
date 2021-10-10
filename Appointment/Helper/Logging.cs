using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using System.Reflection;
using System.Xml.Serialization;
using System.IO;
using System.Xml;

namespace Logging
{
    /// <summary>
    /// SSS logging helper.
    /// </summary>
    public static class LoggingHelper
    {
        private static log4net.ILog _logger = LogManager.GetLogger("WebLogger");
        /// <summary>
        /// Logs the fatal.
        /// </summary>
        /// <param name="loggerName">Name of the _logger.</param>
        /// <param name="message">The message.</param>
        public static void LogFatal(string message)
        {
            if (_logger.IsFatalEnabled)
                _logger.Fatal(message);
        }

        /// <summary>
        /// Logs the error.
        /// </summary>
        /// <param name="loggerName">Name of the _logger.</param>
        /// <param name="message">The message.</param>
        public static void LogError(string message)
        {
            if (_logger.IsErrorEnabled)
                _logger.Error(message);
        }

        /// <summary>
        /// Logs the error.
        /// </summary>
        /// <param name="loggerName">Name of the _logger.</param>
        /// <param name="ex">The ex.</param>
        public static void LogError(Exception ex)
        {
            if (_logger.IsErrorEnabled)
                _logger.Error("Exception Caught: ", ex);
        }

        /// <summary>
        /// Logs the warning.
        /// </summary>
        /// <param name="loggerName">Name of the _logger.</param>
        /// <param name="message">The message.</param>
        public static void LogWarn(string message)
        {
            if (_logger.IsWarnEnabled)
                _logger.Warn(message);
        }

        /// <summary>
        /// Logs the info.
        /// </summary>
        /// <param name="loggerName">Name of the _logger.</param>
        /// <param name="message">The message.</param>
        public static void LogInfo(string message)
        {
            if (_logger.IsInfoEnabled)
                _logger.Info(message);
        }


        public static void LogObject<T>(T value)
        {

            try
            {
                var xmlserializer = new XmlSerializer(typeof(T));
                var stringWriter = new StringWriter();
                using (var writer = XmlWriter.Create(stringWriter))
                {
                    xmlserializer.Serialize(writer, value);
                    var message = stringWriter.ToString();

                    if (_logger.IsInfoEnabled)
                        _logger.Info(message);
                }
            }
            catch (Exception ex)
            {
            }
        }

        /// <summary>
        /// Logs the debug.
        /// </summary>
        /// <param name="loggerName">Name of the _logger.</param>
        /// <param name="message">The message.</param>
        public static void LogDebug(string message)
        {
            if (_logger.IsDebugEnabled)
                _logger.Debug(message);
        }

        /// <summary>
        /// Logs with Error level the method name with the parameters given
        /// Recommended to be called inside the catch block.
        /// Therefore, should not throw any exception even if failed in order not to
        /// interfere with the exception being handled
        /// </summary>
        /// <param name="loggerName">Name of the _logger.</param>
        /// <param name="method">The method.</param>
        /// <param name="args">The args.</param>
        static public void LogErrorMethodParams(string loggerName, MethodBase method, params object[] args)
        {
            try
            {
                string methodName = "null";
                if (loggerName == null)
                    loggerName = "null";
                ILog logger = log4net.LogManager.GetLogger(loggerName);
                if (!logger.IsErrorEnabled)
                    return;
                if (method != null)
                    methodName = method.Name;
                string message = "Exception caught at: " + methodName + "(";
                if (args.Length > 0)
                    message += (args[0] == null) ? "null" : args[0];
                for (int i = 1; i < args.Length; i++)
                    message += ", " + ((args[i] == null) ? "null" : args[i]);
                message += ")";
                logger.Error(message);
            }
            catch   // failed to log when an error happened
            {
                // nothing to do
                // we'll avoid throwing in order not to hide the original error
                // the reason why we are trying to log en error at first place
            }
        }

    }
}

