using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetshopPeterson.Data;
using PetshopPeterson.Models;
using System.Text.Json;

namespace PetshopPeterson.Controllers
{
    [ApiController]
    [Route("api/tutores")]
    public class TutoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TutoresController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tutores = await _context.Tutor.ToListAsync();
            return Ok(tutores);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTutor(int id)
        {
            var tutor = await _context.Tutor.FindAsync(id);
            return tutor != null ? Ok(tutor) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Register(Tutor tutor)
        {
            if (await _context.Tutor.AnyAsync(t => t.email == tutor.email))
                return BadRequest("Email já está em uso.");

            _context.Tutor.Add(tutor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTutor), new { id = tutor.Id }, tutor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JsonElement dados)
        {
            var tutor = await _context.Tutor.FindAsync(id);
            if (tutor == null) return NotFound();

            tutor.nome = dados.GetProperty("nome").GetString() ?? tutor.nome;
            tutor.email = dados.GetProperty("email").GetString() ?? tutor.email;
            tutor.senha = dados.GetProperty("senha").GetString() ?? tutor.senha;

            _context.Tutor.Update(tutor);
            await _context.SaveChangesAsync();
            return Ok(tutor);
        }
    }
}
