document.addEventListener("DOMContentLoaded", () => {
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

  // Validación del formulario de contacto
  const form = document.getElementById("form-contacto");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("contacto-nombre").value.trim();
    const correo = document.getElementById("contacto-email").value.trim();
    const comentario = document.getElementById("contacto-comentario").value.trim();

    // Validación de nombre
    if (!nombre) {
      alert("El nombre es requerido");
      return;
    }
    if (nombre.length > 100) {
      alert("El nombre no puede superar los 100 caracteres");
      return;
    }

    // Validación de correo
    if (correo.length > 100) {
      alert("El correo no puede superar los 100 caracteres");
      return;
    }
    const dominioValido = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
    if (!dominioValido.test(correo)) {
      alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }

    // Validación de comentario
    if (!comentario) {
      alert("El comentario es requerido");
      return;
    }
    if (comentario.length > 500) {
      alert("El comentario no puede superar los 500 caracteres");
      return;
    }

    alert("Mensaje enviado correctamente");
    form.reset();
  });
});
