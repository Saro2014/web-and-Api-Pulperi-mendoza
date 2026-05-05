using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulperiaAPI.Models
{
    [Table("Productos")]
    public class Producto
    {
        [Key]
        public int IDProductos { get; set; }

        public string NombreProducto { get; set; } = string.Empty;
        public string TipoProducto {  get; set; } = string.Empty;
        public decimal PrecioVenta { get; set; }
        public int Stock { get; set; }
        public string Imagen { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
    }
}
