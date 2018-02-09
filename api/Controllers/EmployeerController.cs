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
    public class EmployeeController : Controller
    {
        private readonly DefaultDbContext _context;

        public EmployeeController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET api/employee
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _context.Employee.OrderBy((o)=> o.LastName);
        }

        // GET api/employee/5
        [HttpGet("{id}", Name = "GetEmployee")]
        public Employee Get(int id)
        {
            return _context.Employee.Find(id);
        }

        // GET api/employee/?=
        [HttpGet("search")]
        public IEnumerable<Employee> Search(string q)
        {
            return _context.Employee.
            Where((c)=> c.LastName.ToLower().Contains(q.ToLower()) || c.FirstName.ToLower().Contains(q.ToLower())).
            OrderBy((o) => o.LastName);
        }

        // POST api/employee
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Employee model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Employee.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetEmployee", new { id = model.EmployeeId }, model);
        }

        // PUT api/employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Employee model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.EmployeeId = id;
            _context.Update(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = new Employee() { EmployeeId = id };
            _context.Entry(employee).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
