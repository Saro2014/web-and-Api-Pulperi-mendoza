using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulperiaAPI.Models
{
    [Table("Factura")]
    public class Factura
    {
        [Key]
        public int IDFactura { get; set; }

        public int IDClientes { get; set; }
        public int IDUsuario { get; set; }
        public string TipoPago { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public DateTime Fecha { get; set; } = DateTime.Now;
    }
}