namespace PetshopPeterson.DTOs
{
    public class AgendamentoDTO
    {
        public string NomePet { get; set; } = string.Empty;
        public string Data { get; set; } = string.Empty;
        public string Hora { get; set; } = string.Empty;

        public List<ServicoDTO> AgendamentoServico { get; set; } = new();
    }

    public class ServicoDTO
    {
        public int ServicoId { get; set; }
        public int Quantidade { get; set; }
    }
}