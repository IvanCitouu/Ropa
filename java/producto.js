// Base de datos simple de productos
const productos = {
  camiseta: {
    nombre: "Camiseta de Fútbol Elixir 10 Navy Blue",
    precio: 35990,
    imagen: "img/image.png",
    descripcion: "Una camiseta ligera y cómoda ideal para entrenamientos y partidos."
  },
  beanie: {
    nombre: "Elixir Reversible Tribal Beanie",
    precio: 9990,
    imagen: "img/1.png",
    descripcion: "Gorro reversible estilo tribal para combinar con cualquier outfit."
  },
  poleron: {
    nombre: "Polerón Elixir Oversize Negro",
    precio: 29990,
    imagen: "img/poleron.png",
    descripcion: "Polerón oversize de algodón con estilo urbano."
  }
  // 👉 Agrega más productos aquí
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener id de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const producto = productos[id];

 if (!producto) {
  alert("Producto no encontrado");
  return;
}

  // 2. Rellenar datos en la página
  document.getElementById("producto-imagen").src = producto.imagen;
  document.getElementById("producto-nombre").textContent = producto.nombre;
  document.getElementById("producto-precio").textContent = "$" + producto.precio.toLocaleString("es-CL");
  document.getElementById("producto-descripcion").textContent = producto.descripcion;

  // 3. Guardar datos para carrito
  const detalle = document.querySelector(".detalle-producto");
  detalle.dataset.nombre = producto.nombre;
  detalle.dataset.precio = producto.precio;
  detalle.dataset.imagen = producto.imagen;

  // 4. Agregar al carrito
  const boton = document.querySelector(".agregar-carrito");

  boton.addEventListener("click", () => {
    console.log("Botón clickeado", producto);
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
    alert(`${producto.nombre} (talla ${tallaSeleccionada}) agregado al carrito ✅`);
  });

});

const acciones = document.getElementById("acciones-header");
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (usuario) {
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
    <a href="carrito.html" id="mostrar-buscador"><img src="img/Carro.jpg" alt="Buscar"></a>
  `;

  // Mostrar/ocultar menú al hacer clic
  const perfilTrigger = document.getElementById("perfil-trigger");
  const menuPerfil = document.getElementById("menu-perfil");

  perfilTrigger.addEventListener("click", () => {
    menuPerfil.style.display = menuPerfil.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!document.getElementById("perfil-dropdown").contains(e.target)) {
      menuPerfil.style.display = "none";
    }
  });

  // Cerrar sesión
  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    window.location.href = "pagp.html";
  });

  // Mostrar buscador
  document.getElementById("mostrar-buscador").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("campo-busqueda").style.display = "block";
  });

  const buscadorIcono = document.getElementById("mostrar-buscador");
if (buscadorIcono) buscadorIcono.remove();
}


