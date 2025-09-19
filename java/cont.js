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