using Microsoft.AspNetCore.Mvc;
using PulperiaAPI.Data;
using PulperiaAPI.Models;
using System.Linq;

namespace PulperiaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================
        // 🔐 LOGIN
        // ==========================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest login)
        {
            var user = _context.Usuarios
                .FirstOrDefault(u => u.NombreUsuario == login.Usuario
                                  && u.PasswordHash == login.Password);

            if (user == null)
                return Unauthorized("Usuario incorrecto");

            return Ok(new
            {
                user.Id,
                user.NombreUsuario,
                user.Rol
            });
        }

        // ==========================
        // 📝 REGISTRO
        // ==========================
        [HttpPost("registro")]
        public IActionResult Registro([FromBody] RegistroRequest registro)
        {
            var existe = _context.Usuarios
                .FirstOrDefault(u => u.NombreUsuario == registro.Usuario);

            if (existe != null)
                return BadRequest("El usuario ya existe");

            // Crear usuario
            var nuevoUsuario = new Usuario
            {
                NombreUsuario = registro.Usuario,
                PasswordHash = registro.Password,
                Rol = "Cliente"
            };

            _context.Usuarios.Add(nuevoUsuario);
            _context.SaveChanges();

            // Crear cliente vinculado
            var nuevoCliente = new Cliente
            {
                Nombre = registro.Nombre,
                Telefono = registro.Telefono,
                Direccion = registro.Direccion,
                IdUsuario = nuevoUsuario.Id
            };

            _context.Clientes.Add(nuevoCliente);
            _context.SaveChanges();

            return Ok(new
            {
                mensaje = "Cuenta creada correctamente"
            });
        }
    }

    // ==========================
    // 🔐 LOGIN REQUEST
    // ==========================
    public class LoginRequest
    {
        public string Usuario { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    // ==========================
    // 📝 REGISTRO REQUEST
    // ==========================
    public class RegistroRequest
    {
        public string Nombre { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Usuario { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
