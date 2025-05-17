using System.ComponentModel.DataAnnotations.Schema;

namespace PetshopPeterson.Models 
{
    public class Tutor
    {
        public int Id { get; set; }

        public int? LogradouroId { get; set; }

        [ForeignKey("LogradouroId")]
        public Logradouro? Logradouro { get; set; }

        public string nome { get; set; } = string.Empty;

        public string senha { get; set; } = string.Empty;

        public string email { get; set; } = string.Empty;

        public int tipo { get; set; }

        public List<Agendamento> Agendamentos { get; set; } = new();

        public List<Servico> Servicos { get; set; } = new();
    }
}
