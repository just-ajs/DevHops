using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevHopsBackEnd.Models;

namespace DevHopsBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusUpdatesController : ControllerBase
    {
        private readonly DevHopsDbContext _context;

        public StatusUpdatesController(DevHopsDbContext context)
        {
            _context = context;
        }

        // GET: api/StatusUpdates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusUpdate>>> GetStatusUpdates()
        {
            return await _context.StatusUpdates.ToListAsync();
        }

        // GET: api/StatusUpdates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatusUpdate>> GetStatusUpdate(string id)
        {
            var statusUpdate = await _context.StatusUpdates.FindAsync(id);

            if (statusUpdate == null)
            {
                return NotFound();
            }

            return statusUpdate;
        }

        // PUT: api/StatusUpdates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusUpdate(string id, StatusUpdate statusUpdate)
        {
            if (id != statusUpdate.StatusUpdateId)
            {
                return BadRequest();
            }

            _context.Entry(statusUpdate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusUpdateExists(id))
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

        // POST: api/StatusUpdates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StatusUpdate>> PostStatusUpdate(StatusUpdate statusUpdate)
        {
            _context.StatusUpdates.Add(statusUpdate);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StatusUpdateExists(statusUpdate.StatusUpdateId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStatusUpdate", new { id = statusUpdate.StatusUpdateId }, statusUpdate);
        }

        // DELETE: api/StatusUpdates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusUpdate(string id)
        {
            var statusUpdate = await _context.StatusUpdates.FindAsync(id);
            if (statusUpdate == null)
            {
                return NotFound();
            }

            _context.StatusUpdates.Remove(statusUpdate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatusUpdateExists(string id)
        {
            return _context.StatusUpdates.Any(e => e.StatusUpdateId == id);
        }
    }
}
