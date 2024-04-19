using CamposDealerAPI.Domain;
using Microsoft.EntityFrameworkCore;

namespace CamposDealerAPI.Models
{
    public partial class ProdutoDBContext : DbContext
    {
        public ProdutoDBContext(DbContextOptions
        <ProdutoDBContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Produto> Produto { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>(entity => {
                entity.HasKey(k => k.idProduto);
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
