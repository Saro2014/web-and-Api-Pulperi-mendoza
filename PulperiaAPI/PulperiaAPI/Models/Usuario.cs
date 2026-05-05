using System.ComponentModel.DataAnnotations.Schema;

namespace PulperiaAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Column("Usuario")]
        public string NombreUsuario { get; set; } = string.Empty;

        [Column("PasswordHash")]
        public string PasswordHash { get; set; } = string.Empty;

        public string Rol { get; set; } = string.Empty;
    }
}
