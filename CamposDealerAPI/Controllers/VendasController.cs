using CamposDealerAPI.Domain;
using CamposDealerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.IdentityModel.Tokens;

namespace CamposDealerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VendasController : ControllerBase
    {

        private readonly VendaDBContext _context_venda;


        public VendasController(VendaDBContext contextVenda)
        {
            _context_venda = contextVenda;
        }

        [HttpGet(Name = "consultaVendas")]
        public ActionResult<IEnumerable<Venda>> consultaVendas()
        {
            return _context_venda.Venda.ToList();
        }

        [HttpGet("{idVenda:int}", Name = "consultaProdutosVenda")]
        public ActionResult<IEnumerable<ProdutoVendaHelper>> ConsultaProdutosVenda(int idVenda)
        {

            var listaProdutosVenda = from pv in _context_venda.ProdutoVenda
                         join p in _context_venda.Produto on pv.idProduto equals p.idProduto
                         where pv.idVenda == idVenda
                         select new ProdutoVendaHelper
                         {
                             idVenda = idVenda,
                             idProduto = p.idProduto,
                             dscProduto = p.dscProduto,
                             vlrUnitarioVenda = pv.vlrUnitarioVenda,
                             qtdVenda = pv.qtdVenda
                         };

            return listaProdutosVenda.ToArray();
        }

        [HttpPost(Name = "salvarVenda")]
        public void salvarVenda([FromBody] Venda venda)
        {
            double valorTotalVenda = 0;

            if (!venda.idVenda.Equals(0))
            {
                var listaProdutos = _context_venda.ProdutoVenda.Where(p => p.idVenda == venda.idVenda).ToList();
                foreach (var produto in listaProdutos)
                {
                    _context_venda.ProdutoVenda.Remove(produto);
                    _context_venda.SaveChanges();
                }
            }

            foreach (ProdutoVenda produto in venda.listaProdutos)
            {
                valorTotalVenda += produto.vlrUnitarioVenda * produto.qtdVenda;

                produto.idVenda = venda.idVenda;
                _context_venda.ProdutoVenda.Add(produto);
            }


            venda.dthVenda =  DateTime.Now;
            venda.vlrTotalVenda = valorTotalVenda;
            if (venda.idVenda.Equals(null) || venda.idVenda.Equals(0))
            {

                var proximoId = (_context_venda.Venda.ToList().Count() > 0 ? _context_venda.Venda.Max(c => c.idVenda) + 1 : 1);
                venda.idVenda = proximoId;
                _context_venda.Venda.Add(venda);
            }
            else
            {
                _context_venda.Venda.Update(venda);
            }

            _context_venda.SaveChanges();
            //_context_venda_produtos.SaveChanges();
        }

        [HttpDelete("{idVenda:int}", Name = "excluirVenda")]
        public void excluirVenda(int idVenda)
        {
            var venda = _context_venda.Venda.Find(idVenda);
            if (venda != null)
            {
                var listaProdutos = _context_venda.ProdutoVenda.Where( p => p.idVenda == idVenda).ToList();
                foreach (var produto in listaProdutos)
                {
                    _context_venda.ProdutoVenda.Remove(produto);
                }
                _context_venda.SaveChanges();

                _context_venda.Venda.Remove(venda);
                _context_venda.SaveChanges();
            }
        }
    }
}
