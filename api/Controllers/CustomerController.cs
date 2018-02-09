/*
Author          : Sr Programmer Analyst Oleg Gorlov
Description:	  : Model Class Customer. 
Copyright       : GMedia-IT-Consulting 
email           : oleg_gorlov@yahoo.com
Date            : 01/25/2018
Release         : 1.0.0
Comment         : Implementation MVC6, .NET C#, .NET Core 2
*/

using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartSystems.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace SmartSystems.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly DefaultDbContext _context;

        public CustomersController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET api/customers
        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return _context.Customer.OrderBy((o)=> o.LastName);
        }

        // GET api/customers/5
        [HttpGet("{id}", Name = "GetCustomer")]
        public Customer Get(int id)
        {
            return _context.Customer.Find(id);
        }

        // GET api/customers/?=
        [HttpGet("search")]
        public IEnumerable<Customer> Search(string q)
        {
            return _context.Customer.
            Where((c)=> c.LastName.ToLower().Contains(q.ToLower()) || c.FirstName.ToLower().Contains(q.ToLower())).
            OrderBy((o) => o.LastName);
        }

        // POST api/customers
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Customer model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Customer.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetCustomer", new { id = model.CustomerId }, model);
        }

        // PUT api/customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Customer model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.CustomerId = id;
            _context.Update(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var customer = new Customer() { CustomerId = id };
            _context.Entry(customer).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
