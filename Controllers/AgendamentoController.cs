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
                .Include(a => a.Tutor)
                .Include(a => a.AgendamentoServico)
                    .ThenInclude(asv => asv.Servico)
                .ToListAsync();

            return Ok(agendamentos);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AgendamentoDTO dto)
        {
            var agendamento = new Agendamento
            {
                TutorId = dto.TutorId,
                Data = DateTime.Now,
                AgendamentoServico = dto.AgendamentoServico.Select(m => new AgendamentoServico
                {
                    ServicoId = m.ServicoId,
                    Quantidade = m.Quantidade
                }).ToList()
            };

            _context.Agendamento.Add(agendamento);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = agendamento.Id }, agendamento);
        }
    }
}
