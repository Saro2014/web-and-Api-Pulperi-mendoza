using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulperiaAPI.Models
{
    [Table("DetalleFactura")]
    public class DetalleFactura
    {
        [Key]
        public int IDDetalle { get; set; }

        public int IDFactura { get; set; }
        public int IDProductos { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }
    }
}
