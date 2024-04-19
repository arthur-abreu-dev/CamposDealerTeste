using CamposDealerAPI.Domain;
using Microsoft.EntityFrameworkCore;

namespace CamposDealerAPI.Models
{
    public partial class ClienteDBContext : DbContext
    {
        public ClienteDBContext(DbContextOptions
        <ClienteDBContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Cliente> Cliente { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(entity => {
                entity.HasKey(k => k.idCliente);
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
