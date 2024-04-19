using CamposDealerAPI.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CamposDealerAPI.Domain
{
    [Table("Produtos")]
    public class Produto
    {
        [Key]
        public int idProduto { get; set; }
        [Required]
        public string dscProduto { get; set; }
        [Required]
        public double vlrUnitario { get; set; }
    }
}
