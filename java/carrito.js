document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabla-carrito tbody");
  const totalGeneral = document.getElementById("total-general");
  const btnVaciar = document.getElementById("vaciar-carrito");
  const btnComprar = document.getElementById("comprar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
        <td><button class="eliminar" data-index="${index}">X</button></td>
      `;
      tbody.appendChild(fila);
    });

    totalGeneral.textContent = "$" + total.toLocaleString("es-CL");
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  tbody.addEventListener("click", e => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("eliminar")) {
      if (confirm(`¿Eliminar "${carrito[index].nombre}" del carrito?`)) {
        carrito.splice(index, 1);
        renderCarrito();
      }
    }

    if (e.target.classList.contains("restar")) {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }
      renderCarrito();
    }

    if (e.target.classList.contains("sumar")) {
      carrito[index].cantidad++;
      renderCarrito();
    }
  });

  btnVaciar.addEventListener("click", () => {
    carrito = [];
    renderCarrito();
  });

  //Comprar y generar orden
  btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío ");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

    const nuevaOrden = {
      id: "ORD" + (ordenes.length + 1).toString().padStart(3, "0"),
      cliente: usuario?.nombre || usuario?.email || "Invitado",
      total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      estado: "Pendiente"
    };

    ordenes.push(nuevaOrden);
    localStorage.setItem("ordenes", JSON.stringify(ordenes));

    carrito = [];
    localStorage.removeItem("carrito");
    renderCarrito();

    alert(`Gracias por tu compra \nOrden creada: ${nuevaOrden.id}`);
  });

  renderCarrito();
});

// Header dinámico
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
    <a href="carrito.html"><img src="img/Carro.jpg" alt="Carro"></a>
  `;

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

  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    window.location.href = "pagp.html";
  });

  document.getElementById("mostrar-buscador").addEventListener("click", function(e) {
    e.preventDefault();
    const campo = document.getElementById("campo-busqueda");
    if (campo) campo.style.display = "block";
  });
}