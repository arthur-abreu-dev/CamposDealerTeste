using CamposDealerAPI.Domain;
using Microsoft.EntityFrameworkCore;

namespace CamposDealerAPI.Models
{
    public partial class ProdutoVendaDBContext : DbContext
    {
        public ProdutoVendaDBContext(DbContextOptions
        <ProdutoVendaDBContext> options)
            : base(options)
        {
        }
        public virtual DbSet<ProdutoVenda> ProdutoVenda { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProdutoVenda>(entity => {
                entity.HasKey(k => new { k.idProduto, k.idVenda } );
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
