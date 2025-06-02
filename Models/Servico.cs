using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace PetshopPeterson.Models

{
    public class Servico
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public int TutorId { get; set; }
        public bool Ativo { get; set; } = true;


        [JsonIgnore]
        [ValidateNever]
        public Tutor Tutor { get; set; } = null!;
    }
}
