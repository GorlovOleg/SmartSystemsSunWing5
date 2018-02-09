/*
Author          : Sr Programmer Analyst Oleg Gorlov
Description:	  : Model Class Employee. 
Copyright       : GMedia-IT-Consulting 
email           : oleg_gorlov@yahoo.com
Date            : 01/25/2018
Release         : 1.0.0
Comment         : Implementation MVC6, .NET C#, .NET Core 2
*/

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartSystems.Models 
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        //--- 1
        public int EmployeeId { get; set; } 
       
        //--- 2
        [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
        [Column("FirstName")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        //--- 3
        [StringLength(50, ErrorMessage = "Last name cannot be longer than 50 characters.")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        
        //--- 4
        [StringLength(10, ErrorMessage = "Gender cannot be longer than 10 characters.")]
        //[Required(ErrorMessage = "The gender address is required")]
        public string Gender { get; set; }

        //--- 5
        [StringLength(50, ErrorMessage = "City cannot be longer than 10 characters.")]
        public string City { get; set; }
       
        //--- 6
        [StringLength(50, ErrorMessage = "Department cannot be longer than 10 characters.")]
        public string Department { get; set; }

        //--- 7
        [StringLength(20, ErrorMessage = "Phone cannot be longer than 10 characters.")]
        public string Phone { get; set; } 


    }
}
