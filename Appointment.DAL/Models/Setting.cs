//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Appointment.DAL.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Setting
    {
        public int ID { get; set; }
        public string Key { get; set; }
        public string Values { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<int> ModifyBy { get; set; }
        public Nullable<System.DateTime> ModifyOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public string Description { get; set; }
        public Nullable<bool> IsPrivate { get; set; }
    }
}
