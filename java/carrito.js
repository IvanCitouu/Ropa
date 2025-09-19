document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabla-carrito tbody");
  const totalGeneral = document.getElementById("total-general");
  const btnVaciar = document.getElementById("vaciar-carrito");
  const btnComprar = document.getElementById("comprar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para renderizar el carrito
  function renderCarrito() {
    tbody.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td>
        <img src="${item.imagen}" alt="${item.nombre}" width="50">
        <p>${item.nombre}</p>
        <small>Talla: ${item.talla}</small>
      </td>
      <td>$${item.precio.toLocaleString("es-CL")}</td>
      <td>
        <button class="restar" data-index="${index}">-</button>
        ${item.cantidad}
        <button class="sumar" data-index="${index}">+</button>
      </td>
      <td>$${subtotal.toLocaleString("es-CL")}</td>
      <td><button class="eliminar" data-index="${index}">❌</button></td>
    `;
      tbody.appendChild(fila);
    });

    totalGeneral.textContent = "$" + total.toLocaleString("es-CL");
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Delegación de eventos
  tbody.addEventListener("click", e => {
    if (e.target.classList.contains("eliminar")) {
      const index = e.target.dataset.index;
      const confirmacion = confirm(`¿Eliminar "${carrito[index].nombre}" del carrito?`);
      if (confirmacion) {
        carrito.splice(index, 1);
        renderCarrito();
      }
    }

    if (e.target.classList.contains("restar")) {
      const index = e.target.dataset.index;
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }
      renderCarrito();
    }

        if (e.target.classList.contains("sumar")) {
    const index = e.target.dataset.index;
    carrito[index].cantidad++;
    renderCarrito();
    } 
  });

  // Vaciar carrito
  btnVaciar.addEventListener("click", () => {
    carrito = [];
    renderCarrito();
  });

  // Comprar (simulado)
  btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 😅");
      return;
    }
    alert("Gracias por tu compra 🛍️");
    carrito = [];
    renderCarrito();
  });

  renderCarrito();
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
