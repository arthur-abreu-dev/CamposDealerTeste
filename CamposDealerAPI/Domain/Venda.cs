using CamposDealerAPI.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CamposDealerAPI.Domain
{
    [Table("Vendas")]
    public class Venda
    {
        [Key]
        public int idVenda { get; set; }
        [Required]
        public int idCliente { get; set; }
        [Required]
        [Column(TypeName = "DateTime2")]
        public DateTime dthVenda { get; set; }
        [Required]
        public double vlrTotalVenda { get; set; }

        public ICollection<ProdutoVenda> listaProdutos { get; set; } 
    }

}
