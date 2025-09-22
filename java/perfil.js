document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("perfil-form");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (!usuarioActivo) {
    alert("No has iniciado sesión");
    window.location.href = "ini.html";
    return;
  }

  // Cargar datos en el formulario
  document.getElementById("perfil-run").value = usuarioActivo.run || "";
  document.getElementById("perfil-correo").value = usuarioActivo.email || "";
  document.getElementById("perfil-nombre").value = usuarioActivo.nombre || "";
  document.getElementById("perfil-apellidos").value = usuarioActivo.apellidos || "";
  document.getElementById("perfil-fecha").value = usuarioActivo.fecha || "";
  document.getElementById("perfil-region").value = usuarioActivo.region || "";
  document.getElementById("perfil-comuna").value = usuarioActivo.comuna || "";
  document.getElementById("perfil-direccion").value = usuarioActivo.direccion || "";

  // Guardar cambios
  form.addEventListener("submit", e => {
    e.preventDefault();

    usuarioActivo.nombre = document.getElementById("perfil-nombre").value.trim();
    usuarioActivo.apellidos = document.getElementById("perfil-apellidos").value.trim();
    usuarioActivo.fecha = document.getElementById("perfil-fecha").value;
    usuarioActivo.direccion = document.getElementById("perfil-direccion").value.trim();

    // Validaciones
    if (!usuarioActivo.nombre || usuarioActivo.nombre.length > 50) {
      alert("Nombre requerido, máximo 50 caracteres.");
      return;
    }

    if (!usuarioActivo.apellidos || usuarioActivo.apellidos.length > 100) {
      alert("Apellidos requeridos, máximo 100 caracteres.");
      return;
    }

    if (!usuarioActivo.direccion || usuarioActivo.direccion.length > 300) {
      alert("Dirección requerida, máximo 300 caracteres.");
      return;
    }

    // Actualizar en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    const index = usuarios.findIndex(u => u.email === usuarioActivo.email);
    if (index >= 0) {
      usuarios[index] = usuarioActivo;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    alert("Perfil actualizado correctamente");
  });
});