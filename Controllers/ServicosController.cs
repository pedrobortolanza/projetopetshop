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
            if (string.IsNullOrWhiteSpace(servico.Descricao) || servico.Valor <= 0 ||
                string.IsNullOrWhiteSpace(servico.NomeCachorro) || string.IsNullOrWhiteSpace(servico.NomeTutor))
            {
                return BadRequest("Todos os campos são obrigatórios.");
            }

            _context.Servico.Add(servico);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = servico.Id }, servico);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Servico input)
        {
            var servico = await _context.Servico.FindAsync(id);
            if (servico == null) return NotFound();

            servico.NomeCachorro = input.NomeCachorro;
            servico.NomeTutor = input.NomeTutor;
            servico.Descricao = input.Descricao;
            servico.Valor = input.Valor;

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
