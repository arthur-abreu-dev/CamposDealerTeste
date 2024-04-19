using CamposDealerAPI.Domain;
using CamposDealerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CamposDealerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientesController : ControllerBase
    {


        private readonly ClienteDBContext _context;

        public ClientesController(ClienteDBContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "consultaClientes")]
        public ActionResult<IEnumerable<Cliente>> consultaClientes()
        {
            return _context.Cliente.ToList();
        }

        [HttpPost(Name = "salvarCliente")]
        public void salvarCliente([FromBody] Cliente cliente)
        {
            if (cliente.idCliente.Equals(null) || cliente.idCliente.Equals(0))
            {
                
                var proximoId = (_context.Cliente.ToList().Count() > 0? _context.Cliente.Max(c => c.idCliente) + 1:1);
                cliente.idCliente = proximoId;
                _context.Cliente.Add(cliente);
            }
            else
            {
                _context.Cliente.Update(cliente);
            }
  
            _context.SaveChanges();
        }
        [HttpDelete("{idCliente:int}", Name = "excluirCliente")]
        public void deletarCliente(int idCliente)
        {
            var cliente = _context.Cliente.Find(idCliente);
            if (cliente != null)
            {
                _context.Cliente.Remove(cliente);
                _context.SaveChanges();
            }
        }

    }
}
