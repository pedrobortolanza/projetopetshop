using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetshopPeterson.Data;
using PetshopPeterson.Models;

namespace PetshopPeterson.Controllers
{
    [ApiController]
    [Route("api/servicos")]
    public class ServicosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ServicosController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Servico.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var servico = await _context.Servico.FindAsync(id);
            if (servico == null) return NotFound();
            return Ok(servico);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Servico servico)
        {
            if (string.IsNullOrWhiteSpace(servico.Descricao) || servico.Valor <= 0)
                return BadRequest("Descrição e valor são obrigatórios.");

            var tutor = await _context.Tutor.FindAsync(servico.TutorId);
            if (tutor == null)
                return NotFound("Tutor não encontrado.");

            _context.Servico.Add(servico);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = servico.Id }, servico);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Servico input)
        {
            var servico = await _context.Servico.FindAsync(id);
            if (servico == null) return NotFound("Serviço não encontrado.");

            var tutor = await _context.Tutor.FindAsync(input.TutorId);
            if (tutor == null) return NotFound("Tutor informado não existe.");

            servico.Descricao = input.Descricao;
            servico.Valor = input.Valor;
            servico.TutorId = input.TutorId;

            _context.Servico.Update(servico);
            await _context.SaveChangesAsync();
            return Ok(servico);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var servico = await _context.Servico.FindAsync(id);
            if (servico == null) return NotFound();

            _context.Servico.Remove(servico);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
