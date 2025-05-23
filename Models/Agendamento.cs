namespace PetshopPeterson.Models 
{
    public class Agendamento 
    {
     public int Id { get; set; }
    public List<AgendamentoServico> AgendamentoServico { get; set; } = new();
    public DateTime Data { get; set; }
    public TimeSpan Hora { get; set; }
    public bool Concluido { get; set; } = false;
    public string? NomePet { get; set; }
    }
}
