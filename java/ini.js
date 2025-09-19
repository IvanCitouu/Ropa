document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");

  const adminCorreo = "admin@tumtum.cl";
  const adminClave = "admin123";

  form.addEventListener("submit", e => {
    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const clave = document.getElementById("password").value.trim();

    if (correo === adminCorreo && clave === adminClave) {
      localStorage.setItem("usuarioActivo", JSON.stringify({
        email: correo,
        nombre: "IvanCitouCL", // o el nombre que tú quieras mostrar
        rol: "admin"
    }));

      alert("Bienvenido Administrador");
      window.location.href = "colec.html";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === correo && u.password === clave);

    if (!usuario) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    alert(`Bienvenido ${usuario.email}`);
    window.location.href = "colec.html";
  });
});
