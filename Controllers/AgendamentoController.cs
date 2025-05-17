using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetshopPeterson.Data;
using PetshopPeterson.Models;
using PetshopPeterson.DTOs;

namespace PetshopPeterson.Controllers
{
    [ApiController]
    [Route("api/agendamentos")]
    public class AgendamentosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AgendamentosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var agendamentos = await _context.Agendamento
                .Include(a => a.AgendamentoServico)
                    .ThenInclude(asv => asv.Servico)
                        .ThenInclude(s => s.Tutor)
                .ToListAsync();

            return Ok(agendamentos);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AgendamentoDTO dto)
        {
            var agendamento = new Agendamento
            {
                Data = DateTime.Parse(dto.Data),
                Hora = TimeSpan.Parse(dto.Hora),
                NomePet = dto.NomePet,
                AgendamentoServico = dto.AgendamentoServico.Select(s => new AgendamentoServico
                {
                    ServicoId = s.ServicoId,
                    Quantidade = s.Quantidade
                }).ToList()
            };

            _context.Agendamento.Add(agendamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = agendamento.Id }, agendamento);
        }
    }
}
