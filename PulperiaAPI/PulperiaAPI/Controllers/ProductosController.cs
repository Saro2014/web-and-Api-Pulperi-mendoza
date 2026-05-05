using Microsoft.AspNetCore.Mvc;
using PulperiaAPI.Data;

namespace PulperiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult ObtenerProductos()
        {
            var productos = _context.Productos.Select(p => new
            {
                idProducto = p.IDProductos,
                nombre = p.NombreProducto,
                precio = p.PrecioVenta,
                stock = p.Stock,
                categoria = p.TipoProducto,
                imagen = p.Imagen,
                descripcion = p.Descripcion
            }).ToList();

            return Ok(productos);
        }
    }
}
