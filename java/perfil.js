document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("perfil-form");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (!usuarioActivo) {
    alert("No has iniciado sesión");
    window.location.href = "ini.html";
    return;
  }

  const usuario = usuarios.find(u => u.email === usuarioActivo.email);
  if (usuario) {
    document.getElementById("perfil-correo").value = usuario.email;
    document.getElementById("perfil-nombre").value = usuario.nombre || "";
    document.getElementById("perfil-direccion").value = usuario.direccion || "";
    document.getElementById("perfil-telefono").value = usuario.telefono || "";
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    usuario.nombre = document.getElementById("perfil-nombre").value.trim();
    usuario.direccion = document.getElementById("perfil-direccion").value.trim();
    usuario.telefono = document.getElementById("perfil-telefono").value.trim();

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    alert("Perfil actualizado");
  });
});

const acciones = document.getElementById("acciones-header");
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (usuario) {
  acciones.innerHTML = `
    <div class="perfil-dropdown" id="perfil-dropdown">
      <div class="perfil-trigger" id="perfil-trigger">
        <img src="img/Inicio.jpg" alt="Perfil" class="icono-perfil">
        <span class="saludo-usuario" id="saludo-usuario">Hola, ${usuario.nombre}</span>
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

  const inputNombre = document.getElementById("perfil-nombre");
  const saludo = document.getElementById("saludo-usuario");

  if (inputNombre && saludo) {
    inputNombre.addEventListener("input", () => {
      const nuevoNombre = inputNombre.value.trim();
      saludo.textContent = nuevoNombre ? `Hola, ${nuevoNombre}` : "Hola";
    });
  }

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