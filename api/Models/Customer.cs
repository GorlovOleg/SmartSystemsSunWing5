/*
Author          : Sr Programmer Analyst Oleg Gorlov
Description:	: Model Class Customer. 
Copyright       : GMedia-IT-Consulting 
email           : oleg_gorlov@yahoo.com
Date            : 01/25/2018
Release         : 1.0.0
Comment         : Implementation MVC6, .NET C#, .NET Core 2
*/

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartSystems.Models
{
  [Table("Customer")]
  public partial class Customer
  {

    [Key]
    //--- 1
    public int CustomerId { get; set; }

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
    [Phone]
    //[DisplayFormat(DataFormatString = "{0:###-###-####}", ApplyFormatInEditMode = true)]
    //[StringLength(14, MinimumLength = 1, ErrorMessage = "Phone cannot be longer than 14 characters.")]
    [Display(Name = "Phone")]
    public string Phone { get; set; }

    //--- 5 
    [StringLength(10, ErrorMessage = "Gender cannot be longer than 10 characters.")]
    //[Required(ErrorMessage = "The gender address is required")]
    public string Gender { get; set; }

    //--- 6       
    //[Required(ErrorMessage = "The email address is required")]
    //[EmailAddress(ErrorMessage = "Invalid Email Address")]
    //[DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    //--- 7     
    public DateTime Birthday { get; set; }
  }
}
