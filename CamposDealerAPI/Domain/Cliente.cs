using CamposDealerAPI.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CamposDealerAPI.Domain
{
    [Table("Clientes")]
    public class Cliente
    {
        [Key]
        [Display(Name = "idCliente")]
        public int idCliente { get; set; }
        [Required]
        [Display(Name = "nmCliente")]
        public string nmCliente { get; set; }
        [Required]
        [Display(Name = "nmCidade")]
        public string nmCidade { get; set; }
    }

}
