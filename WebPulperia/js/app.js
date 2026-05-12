// ==========================
// 🛒 CARRITO
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(idProducto, nombre, precio, imagen) {

    precio = Number(precio);

    let producto = carrito.find(p => p.idProducto === idProducto);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            idProducto,
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// ==========================
// 🔢 CONTADOR
// ==========================
function actualizarContador() {
    let contador = document.getElementById("contador");

    if (contador) {
        let total = 0;
        carrito.forEach(p => total += p.cantidad);
        contador.textContent = total;

        // animación
        contador.style.animation = "none";
        contador.offsetHeight;
        contador.style.animation = "pop 0.3s ease";
    }
}

// ==========================
// 🛒 IR AL CARRITO
// ==========================
function irCarrito() {
    const rutaActual = window.location.pathname;

    if (rutaActual.includes("/paginas/")) {
        window.location.href = "carrito.html";
    } else {
        window.location.href = "paginas/carrito.html";
    }
}

// ==========================
// 📱 MENÚ RESPONSIVE
// ==========================
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

// ==========================
// 🔐 LOGIN
// ==========================
function login() {

    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    fetch("https://localhost:7165/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Usuario o contraseña incorrectos");
        }
        return response.json();
    })
    .then(data => {

        // guardar sesión
        localStorage.setItem("usuario", JSON.stringify(data));

        // redirigir
        window.location.href = "../index.html";
    })
    .catch(error => {
        alert(error.message);
    });
}

// ==========================
// 👤 VERIFICAR LOGIN
// ==========================
function verificarLogin() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {

        // Ocultar botón login
        let btnLogin = document.getElementById("btnLogin");
        if (btnLogin) btnLogin.style.display = "none";

        // Mostrar nombre
        let usuarioInfo = document.getElementById("usuarioInfo");
        let nombreUsuario = document.getElementById("nombreUsuario");

        if (usuarioInfo && nombreUsuario) {
            usuarioInfo.style.display = "block";
            nombreUsuario.textContent = "👤 " + usuario.nombreUsuario;
        }

        // Mostrar admin si corresponde
        if (usuario.rol === "Admin") {
            let menuAdmin = document.getElementById("menuAdmin");
            if (menuAdmin) menuAdmin.style.display = "block";
        }
    }
}

// ==========================
// ⚙️ MENÚ ADMIN
// ==========================
function toggleAdminMenu() {
    let menu = document.getElementById("adminOpciones");
    menu.classList.toggle("show");
}

// ==========================
// 🚪 LOGOUT
// ==========================
// ==========================
// 🚪 LOGOUT
// ==========================
function logout() {

    // Borrar sesión
    localStorage.removeItem("usuario");

    // Opcional: cerrar menú admin
    let menuAdmin = document.getElementById("menuAdmin");
    if (menuAdmin) {
        menuAdmin.style.display = "none";
    }

    // Redirigir al inicio
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    verificarLogin();
    cargarProductos();
    cargarDestacados();
});

// ===== MOSTRAR CARRITO SOLO EN carrito.html =====
if (document.getElementById("lista") && document.getElementById("total")) {

    let lista = document.getElementById("lista");
    let totalHTML = document.getElementById("total");

    let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    lista.innerHTML = "";

    // Encabezado profesional
    if (carritoGuardado.length > 0) {
        lista.innerHTML = `
            <div class="carrito-header">
                <span>Producto</span>
                <span>Cantidad</span>
                <span>Subtotal</span>
                <span>Acciones</span>
            </div>
        `;
    }

    if (carritoGuardado.length === 0) {

        lista.innerHTML = `
            <div class="carrito-vacio">
                <h3>🛒 Tu carrito está vacío</h3>
                <p>Agrega productos para comenzar tu compra</p>
            </div>
        `;

    } else {

        carritoGuardado.forEach((producto, index) => {

            let subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            lista.innerHTML += `
                <div class="carrito-item">

                    <div class="carrito-producto">

                            <img src="${producto.imagen}" class="carrito-img">

                    <div>
                        <h3>${producto.nombre}</h3>
                        <p>Precio unitario: C$${producto.precio}</p>
                    </div>

                </div>

                    <div class="carrito-cantidad">
                        <button onclick="cambiarCantidad(${index}, -1)">−</button>
                        <span>${producto.cantidad}</span>
                        <button onclick="cambiarCantidad(${index}, 1)">+</button>
                    </div>

                    <div class="carrito-subtotal">
                        <strong>C$${subtotal}</strong>
                    </div>

                    <div class="carrito-acciones">
                        <button class="btn-eliminar" onclick="eliminarProducto(${index})">
                            Eliminar
                        </button>
                    </div>

                </div>
            `;
        });
    }

    totalHTML.textContent = total;
}

// ===== ELIMINAR PRODUCTO =====
function eliminarProducto(index) {

    let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoGuardado.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carritoGuardado));

    location.reload();
}

// ===== VACIAR CARRITO =====
function vaciarCarrito() {

    localStorage.removeItem("carrito");

    location.reload();
}

// ===== FINALIZAR COMPRA =====
function finalizarCompra() {

    alert("Compra realizada correctamente");

    localStorage.removeItem("carrito");

    location.reload();
}

function cambiarCantidad(index, cambio) {
    let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoGuardado[index].cantidad += cambio;

    if (carritoGuardado[index].cantidad <= 0) {
        carritoGuardado.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
    location.reload();
}

// ==========================
// 📝 REGISTRO DE USUARIO
// ==========================
function registrarUsuario() {

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let usuario = document.getElementById("usuarioRegistro").value;
    let password = document.getElementById("passwordRegistro").value;

    // Validación básica
    if (!nombre || !telefono || !direccion || !usuario || !password) {
        alert("Por favor completa todos los campos");
        return;
    }

    fetch("https://localhost:7165/api/auth/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
            usuario: usuario,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                throw new Error(error);
            });
        }

        return response.json();
    })
    .then(data => {

        alert("Cuenta creada correctamente");

        // Redirigir a login
        window.location.href = "login.html";
    })
    .catch(error => {
        alert(error.message);
    });
}

function cargarProductos() {

    let contenedor = document.getElementById("contenedorProductos");

    if (!contenedor) return;

    let categoria = contenedor.dataset.categoria;

    let url = "https://localhost:7165/api/productos";

    if (categoria) {
        url = `https://localhost:7165/api/productos/categoria/${categoria}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(productos => {

            contenedor.innerHTML = "";

            productos.forEach(p => {

                contenedor.innerHTML += `
                    <div class="card producto-card">

                        <img src="${p.imagen}" alt="${p.nombre}">

                        <h3>${p.nombre}</h3>

                        <p class="precio">C$${p.precio}</p>

                        <div class="producto-info">
                            <p>${p.descripcion}</p>
                            <p><strong>Stock:</strong> ${p.stock}</p>
                            <p><strong>Categoría:</strong> ${p.categoria}</p>
                        </div>

                        <button class="btn-comprar"
                            onclick="agregarCarrito(${p.idProducto}, '${p.nombre}', ${Number(p.precio)}, '${p.imagen}')">
                            Agregar
                        </button>

                    </div>
                `;
            });

        })
        .catch(error => {
            console.log("Error cargando productos:", error);
        });
}
function cargarDestacados() {

    let contenedor = document.getElementById("destacados");

    if (!contenedor) return;

    fetch("https://localhost:7165/api/productos/destacados")
        .then(res => res.json())
        .then(productos => {

            contenedor.innerHTML = "";

            productos.forEach(p => {

                contenedor.innerHTML += `
                    <div class="card producto-card">

                        <img src="${p.imagen}">
                        <h3>${p.nombre}</h3>
                        <p class="precio">C$${p.precio}</p>

                        <div class="producto-info">
                            <p>${p.descripcion}</p>
                        </div>

                        <button class="btn-comprar"
                            onclick="agregarCarrito(${p.idProducto}, '${p.nombre}', ${Number(p.precio)}, '${p.imagen}')">
                            Agregar
                        </button>

                    </div>
                `;
            });

        });
}