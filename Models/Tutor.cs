namespace PetshopPeterson.Models 
{
    public class Tutor
    {
        public int Id {get; set;}

        public int? LogradouroId {get; set;}

        public Logradouro? Logradouro {get; set;}

        public string nome {get; set;}

        public string senha {get; set;}

        public string email {get; set;}

        public int tipo { get; set; }

        public List<Agendamento> Agendamentos {get; set;} = new();
    }

}