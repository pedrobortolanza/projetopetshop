namespace PetshopPeterson.Models 
{
    public class Agendamento 
    {
     public int Id { get; set; }

    // Tutor removido temporariamente
    // public int TutorId { get; set; }
    // public Tutor Tutor { get; set; } = null!;

    public List<AgendamentoServico> AgendamentoServico { get; set; } = new();

    public DateTime Data { get; set; }
    public TimeSpan Hora { get; set; }

    public string? NomePet { get; set; }
    }
}
