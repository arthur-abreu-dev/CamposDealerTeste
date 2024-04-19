using CamposDealerAPI.Domain;
using Microsoft.EntityFrameworkCore;

namespace CamposDealerAPI.Models
{
    public partial class VendaDBContext : DbContext
    {
        public VendaDBContext(DbContextOptions
        <VendaDBContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Venda> Venda { get; set; }

        public virtual DbSet<ProdutoVenda> ProdutoVenda { get; set; }

        public virtual DbSet<Produto> Produto { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Venda>(entity => {
                entity.HasKey(k => k.idVenda);
            });
            modelBuilder.Entity<ProdutoVenda>(entity => {
                entity.HasKey(k => new { k.idProduto, k.idVenda });
            });
            modelBuilder.Entity<Produto>(entity => {
                entity.HasKey(k => k.idProduto);
            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
