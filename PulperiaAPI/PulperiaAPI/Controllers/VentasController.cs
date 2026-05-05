using Microsoft.AspNetCore.Mvc;
using PulperiaAPI.Data;
using PulperiaAPI.Models;

namespace PulperiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("finalizar")]
        public IActionResult FinalizarCompra([FromBody] VentaRequest request)
        {
            if (request.Productos == null || request.Productos.Count == 0)
                return BadRequest("El carrito está vacío");

            var cliente = _context.Clientes
                .FirstOrDefault(c => c.IdUsuario == request.IdUsuario);

            if (cliente == null)
                return BadRequest("No se encontró el cliente");

            decimal total = 0;

            foreach (var item in request.Productos)
            {
                var producto = _context.Productos
                    .FirstOrDefault(p => p.IDProductos == item.IdProducto);

                if (producto == null)
                    return BadRequest("Producto no encontrado");

                if (producto.Stock < item.Cantidad)
                    return BadRequest($"Stock insuficiente para {producto.NombreProducto}");

                total += producto.PrecioVenta * item.Cantidad;
            }

            var factura = new Factura
            {
                IDClientes = cliente.IDClientes,
                IDUsuario = request.IdUsuario,
                TipoPago = request.TipoPago,
                Total = total,
                Fecha = DateTime.Now
            };

            _context.Facturas.Add(factura);
            _context.SaveChanges();

            foreach (var item in request.Productos)
            {
                var producto = _context.Productos
                    .First(p => p.IDProductos == item.IdProducto);

                var detalle = new DetalleFactura
                {
                    IDFactura = factura.IDFactura,
                    IDProductos = producto.IDProductos,
                    Cantidad = item.Cantidad,
                    Precio = producto.PrecioVenta
                };

                _context.DetalleFacturas.Add(detalle);
            }

            _context.SaveChanges();

            return Ok(new
            {
                mensaje = "Compra realizada correctamente",
                factura = factura.IDFactura,
                total = total
            });
        }
    }

    public class VentaRequest
    {
        public int IdUsuario { get; set; }
        public string TipoPago { get; set; } = "Efectivo";
        public List<ProductoVentaRequest> Productos { get; set; } = new();
    }

    public class ProductoVentaRequest
    {
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
    }
}
