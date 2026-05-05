using Microsoft.EntityFrameworkCore;
using PulperiaAPI.Models;

namespace PulperiaAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Factura> Facturas { get; set; }
        public DbSet<DetalleFactura> DetalleFacturas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>()
                .HasKey(c => c.IDClientes);

            modelBuilder.Entity<Cliente>()
                .ToTable("Clientes");

            modelBuilder.Entity<Usuario>()
                .ToTable("Usuarios");

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Producto>().HasKey(p => p.IDProductos);
            modelBuilder.Entity<Factura>().HasKey(f => f.IDFactura);
            modelBuilder.Entity<DetalleFactura>().HasKey(d => d.IDDetalle);

            modelBuilder.Entity<Factura>().ToTable("Factura");
            modelBuilder.Entity<DetalleFactura>().ToTable("DetalleFactura");
            modelBuilder.Entity<Producto>().ToTable("Productos");
        }
    }
}

