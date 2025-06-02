using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetshopPeterson.Data;
using PetshopPeterson.Models;

namespace PetshopPeterson.Controllers
{
    [ApiController]
    [Route("api/logradouros")]
    public class LogradourosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LogradourosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByTutorId(int id)
        {
            var tutor = await _context.Tutor.Include(t => t.Logradouro).FirstOrDefaultAsync(t => t.Id == id);
            if (tutor == null || tutor.Logradouro == null) return NotFound("Logradouro não encontrado.");
            return Ok(tutor.Logradouro);
        }

        [HttpPut("{tutorId}")]
        public async Task<IActionResult> UpdateOrCreate(int tutorId, Logradouro logradouro)
        {
            var tutor = await _context.Tutor.FindAsync(tutorId);
            if (tutor == null) return NotFound("Tutor não encontrado.");

            if (tutor.LogradouroId.HasValue)
            {
                var old = await _context.Logradouro.FindAsync(tutor.LogradouroId);
                if (old != null)
                {
                    old.cep = logradouro.cep;
                    old.rua = logradouro.rua;
                    old.numero = logradouro.numero;
                    old.complemento = logradouro.complemento;
                    _context.Logradouro.Update(old);
                }
            }
            else
            {
                _context.Logradouro.Add(logradouro);
                await _context.SaveChangesAsync();
                tutor.LogradouroId = logradouro.Id;
                _context.Tutor.Update(tutor);
            }

            await _context.SaveChangesAsync();
            return Ok("Logradouro atualizado com sucesso.");
        }
    }
}