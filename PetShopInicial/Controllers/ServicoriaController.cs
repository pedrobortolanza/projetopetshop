using Microsoft.AspNetCore.Mvc;

namespace PetshopPeterson.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ServicoriaController : ControllerBase
    {
        [HttpGet("ping")]
        public IActionResult Ping() => Ok("API funcionando!");
    }
}