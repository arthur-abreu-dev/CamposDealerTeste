using CamposDealerAPI.Domain;
using CamposDealerAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CamposDealerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutosController : ControllerBase
    {

        private readonly ProdutoDBContext _context;

        public ProdutosController(ProdutoDBContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "consultaProdutos")]
        public ActionResult<IEnumerable<Produto>> Get()
        {
            return _context.Produto.ToList();
        }

        [HttpPost(Name = "salvarProduto")]
        public void salvarProduto([FromBody] Produto produto)
        {
            if (produto.idProduto.Equals(null) || produto.idProduto.Equals(0))
            {

                var proximoId = (_context.Produto.ToList().Count() > 0 ? _context.Produto.Max(c => c.idProduto) + 1 : 1);
                produto.idProduto = proximoId;
                _context.Produto.Add(produto);
            }
            else
            {
                _context.Produto.Update(produto);
            }

            _context.SaveChanges();
        }
        [HttpDelete("{idProduto:int}", Name = "excluirProduto")]
        public void deletarProduto(int idProduto)
        {
            var produto = _context.Produto.Find(idProduto);
            if (produto != null)
            {
                _context.Produto.Remove(produto);
                _context.SaveChanges();
            }
        }
    }
}
