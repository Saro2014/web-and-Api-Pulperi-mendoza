using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulperiaAPI.Models
{
    [Table("Productos")]
    public class Producto
    {
        public int IDProductos { get; set; }

        public string NombreProducto { get; set; } = string.Empty;

        public string TipoProducto { get; set; } = string.Empty;

        public decimal PrecioCompra { get; set; }

        public decimal PrecioVenta { get; set; }

        public string UnidadCompra { get; set; } = string.Empty;

        public string UnidadVenta { get; set; } = string.Empty;

        public int FactorConversion { get; set; }

        public int Stock { get; set; }

        public string Imagen { get; set; } = string.Empty;

        public string Descripcion { get; set; } = string.Empty;

        public bool Destacado { get; set; }
    }
}
