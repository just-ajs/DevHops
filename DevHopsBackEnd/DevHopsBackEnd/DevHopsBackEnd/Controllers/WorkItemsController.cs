using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevHopsBackEnd.Models;

namespace DevHopsBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkItemsController : ControllerBase
    {
        private readonly DevHopsDbContext _context;

        public WorkItemsController(DevHopsDbContext context)
        {
            _context = context;
        }

        // GET: api/WorkItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkItem>>> GetWorkItems()
        {
            return await _context.WorkItems
                .Include(w=>w.StatusUpdates)
                .ToListAsync();
        }

        // GET: api/WorkItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkItem>> GetWorkItem(string id)
        {
            var workItem = await _context.WorkItems
                .Where(w=>w.WorkItemId.Equals(id))
                .Include(w=>w.StatusUpdates)
                .FirstOrDefaultAsync();

            if (workItem == null)
            {
                return NotFound();
            }

            return workItem;
        }

        // PUT: api/WorkItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkItem(string id, WorkItem workItem)
        {
            if (id != workItem.WorkItemId)
            {
                return BadRequest();
            }

            _context.Entry(workItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WorkItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WorkItem>> PostWorkItem(WorkItem workItem)
        {
            _context.WorkItems.Add(workItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WorkItemExists(workItem.WorkItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWorkItem", new { id = workItem.WorkItemId }, workItem);
        }

        // DELETE: api/WorkItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkItem(string id)
        {
            var workItem = await _context.WorkItems
                .Where(w=>w.WorkItemId.Equals(id))
                .Include(w=>w.StatusUpdates)
                .FirstOrDefaultAsync();

            if (workItem == null)
            {
                return NotFound();
            }

            _context.WorkItems.Remove(workItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkItemExists(string id)
        {
            return _context.WorkItems.Any(e => e.WorkItemId == id);
        }
    }
}
