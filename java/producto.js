const productos = {
  camiseta: {
    nombre: "Camiseta de Fútbol Elixir 10 Navy Blue",
    precio: 35990,
    stock: 10,
    stockCritico: 3,
    categoria: "Ropa",
    imagen: "img/image.png",
    descripcion: "Camiseta ligera y cómoda ideal para entrenamientos y partidos."
  },
  beanie: {
    nombre: "Elixir Reversible Tribal Beanie",
    precio: 9990,
    stock: 15,
    stockCritico: 5,
    categoria: "Accesorios",
    imagen: "img/1.png",
    descripcion: "Beanie reversible con diseño tribal."
  },
  pantalon: {
    nombre: "Elixir X Cozy DETACHABLE jeans",
    precio: 89900,
    stock: 8,
    stockCritico: 2,
    categoria: "Ropa",
    imagen: "img/5.png",
    descripcion: "Jeans desmontables con estilo urbano."
  },
  tank: {
    nombre: "Elixir Basket Tank Top",
    precio: 28000,
    stock: 12,
    stockCritico: 4,
    categoria: "Ropa",
    imagen: "img/2.png",
    descripcion: "Polera sin mangas estilo basket."
  },
  jorts: {
    nombre: "Elixir White Denim Set JORTS",
    precio: 29990,
    stock: 6,
    stockCritico: 2,
    categoria: "Ropa",
    imagen: "img/3.png",
    descripcion: "Shorts de mezclilla blanca estilo set."
  },
  jacket: {
    nombre: "Elixir Raw Denim Set JACKET",
    precio: 29990,
    stock: 5,
    stockCritico: 2,
    categoria: "Ropa",
    imagen: "img/4.png",
    descripcion: "Chaqueta de mezclilla cruda estilo set."
  },
  pantalon1: {
    nombre: "Elixir White Leather Tribal Pants",
    precio: 59990,
    stock: 4,
    stockCritico: 1,
    categoria: "Ropa",
    imagen: "img/6.png",
    descripcion: "Pantalones de cuero blanco con diseño tribal."
  },
  tank1: {
    nombre: "Elixir Gray Tank Top",
    precio: 19990,
    stock: 20,
    stockCritico: 5,
    categoria: "Ropa",
    imagen: "img/7.png",
    descripcion: "Polera gris sin mangas, cómoda y versátil."
  }
};

// Convertir objeto de productos a array compatible con admin.js
const productosArray = Object.entries(productos).map(([codigo, p]) => ({
  codigo,
  nombre: p.nombre,
  precio: p.precio,
  stock: p.stock ?? 0,
  stockCritico: p.stockCritico ?? null,
  categoria: p.categoria ?? "Sin categoría",
  imagen: p.imagen ?? "img/default.jpg",
  descripcion: p.descripcion ?? ""
}));

localStorage.setItem("productos", JSON.stringify(productosArray));

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const producto = productos[id];

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  // Mostrar datos del producto
  document.getElementById("producto-imagen").src = producto.imagen;
  document.getElementById("producto-nombre").textContent = producto.nombre;
  document.getElementById("producto-precio").textContent = "$" + producto.precio.toLocaleString("es-CL");
  document.getElementById("producto-descripcion").textContent = producto.descripcion;

  // Agregar al carrito
  document.querySelector(".agregar-carrito").addEventListener("click", () => {
    const tallaSeleccionada = document.getElementById("talla").value;
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.nombre === producto.nombre && item.talla === tallaSeleccionada);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        talla: tallaSeleccionada,
        cantidad: 1
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} (talla ${tallaSeleccionada}) agregado al carrito `);
  });

  // Header dinámico para usuario activo
  const acciones = document.getElementById("acciones-header");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuario && acciones) {
    acciones.innerHTML = `
      <div class="perfil-dropdown" id="perfil-dropdown">
        <div class="perfil-trigger" id="perfil-trigger">
          <img src="img/Inicio.jpg" alt="Perfil" class="icono-perfil">
          <span class="saludo-usuario">Hola, ${usuario.nombre || usuario.email}</span>
        </div>
        <div class="menu-perfil" id="menu-perfil">
          <a href="perfil.html">Editar perfil</a>
          <a href="carrito.html">Mi carrito</a>
        </div>
      </div>
      <button id="cerrar-sesion">Cerrar cuenta</button>
      <a href="#" id="mostrar-buscador"><img src="img/Lupa.jpg" alt="Buscar"></a>
      <a href="carrito.html" id="icono-carrito"><img src="img/Carro.jpg" alt="Carro"></a>
    `;

    const perfilTrigger = document.getElementById("perfil-trigger");
    const menuPerfil = document.getElementById("menu-perfil");

    perfilTrigger?.addEventListener("click", () => {
      menuPerfil.style.display = menuPerfil.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!document.getElementById("perfil-dropdown").contains(e.target)) {
        menuPerfil.style.display = "none";
      }
    });

    document.getElementById("cerrar-sesion")?.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      alert("Sesión cerrada");
      window.location.href = "pagp.html";
    });

    document.getElementById("mostrar-buscador")?.addEventListener("click", function(e) {
      e.preventDefault();
      const campo = document.getElementById("campo-busqueda");
      if (campo) campo.style.display = "block";
    });
  }
});