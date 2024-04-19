using CamposDealerAPI.Domain;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CamposDealerAPI.Domain
{
    [Table("ProdutosVendas")]
    [PrimaryKey(nameof(idVenda), nameof(idProduto))]
    public class ProdutoVenda
    {
 
        [Required]
        public int idVenda { get; set; }
        [Required]
        public int idProduto { get; set; }
        [Required]
        public double qtdVenda { get; set; }
        [Required]
        public double vlrUnitarioVenda { get; set; }

    }
}
