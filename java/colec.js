document.getElementById("sort").addEventListener("change", function() {
    let productos = Array.from(document.querySelectorAll(".producto"));
    let contenedor = document.querySelector(".productos");

    let opcion = this.value;

    productos.sort((a, b) => {
        let precioA = parseInt(a.querySelector("p").textContent.replace(/\D/g, ""));
        let precioB = parseInt(b.querySelector("p").textContent.replace(/\D/g, ""));
        let nombreA = a.querySelector("h2").textContent.trim();
        let nombreB = b.querySelector("h2").textContent.trim();

        if (opcion === "asc") {
            return precioA - precioB; // menor a mayor
        } else if (opcion === "desc") {
            return precioB - precioA; // mayor a menor
        } else if (opcion === "nombre") {
            return nombreA.localeCompare(nombreB);
        }
    });

    contenedor.innerHTML = "";
    productos.forEach(p => contenedor.appendChild(p));
});

function cambiarVista(vista, botonSeleccionado) {
  const contenedor = document.querySelector('.productos');
  contenedor.classList.remove('vista-grande', 'vista-mediano', 'vista-pequeño');
  contenedor.classList.add(`vista-${vista}`);
  

  const botones = document.querySelectorAll('.view-button button');
  botones.forEach(btn => btn.classList.remove('activo'));

  botonSeleccionado.classList.add('activo');
}

window.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector('.productos');
  contenedor.classList.add('vista-grande');

  // Opcional: marcar el botón mediano como activo
  const botonGrande = document.querySelector('.view-button button:nth-child(1)');
  if (botonGrande) {
    botonGrande.classList.add('activo');
  }
});

document.getElementById("mostrar-buscador").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("campo-busqueda").style.display = "block";
});


document.getElementById("buscar").addEventListener("input", function() {
  const texto = this.value.toLowerCase();
  const productos = document.querySelectorAll(".producto");
  let resultados = document.getElementById("resultados-busqueda");

  if (!resultados) {
    resultados = document.createElement("div");
    resultados.id = "resultados-busqueda";
    document.getElementById("campo-busqueda").appendChild(resultados);
  }

  resultados.innerHTML = "";

  productos.forEach(producto => {
    const nombre = producto.querySelector("h2").textContent.toLowerCase();
    const imagenSrc = producto.querySelector("img").getAttribute("src");
    const alt = producto.querySelector("img").getAttribute("alt");

    if (nombre.includes(texto) && texto !== "") {
      const item = document.createElement("div");
      item.classList.add("resultado-item");

      item.innerHTML = `
        <img src="${imagenSrc}" alt="${alt}">
        <h3>${producto.querySelector("h2").textContent}</h3>
      `;

      resultados.appendChild(item);
    }
  });
});

document.getElementById("cerrar-buscador").addEventListener("click", function() {
  document.getElementById("campo-busqueda").style.display = "none";
  document.getElementById("buscar").value = "";
  document.getElementById("resultados-busqueda").innerHTML = "";
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
}







