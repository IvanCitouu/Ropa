document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");

  const adminCorreo = "admin@duoc.cl";
  const adminClave = "admin123";

  form.addEventListener("submit", e => {
    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const clave = document.getElementById("password").value.trim();

    // Validación de correo
    if (!correo) {
      alert("El correo es requerido");
      return;
    }

    if (correo.length > 100) {
      alert("El correo no puede superar los 100 caracteres");
      return;
    }

    const dominioValido = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
    if (!dominioValido.test(correo)) {
      alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }

    // Validación de contraseña
    if (!clave) {
      alert("La contraseña es requerida");
      return;
    }

    if (clave.length < 4 || clave.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres");
      return;
    }

    // Login administrador
    if (correo === adminCorreo && clave === adminClave) {
      localStorage.setItem("usuarioActivo", JSON.stringify({
        email: correo,
        nombre: "Admin", 
        rol: "administrador"
      }));

      alert("Bienvenido Administrador");
      window.location.href = "admin.html";
      return;
    }

    // Login usuario normal
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === correo && u.password === clave);

    if (!usuario) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      alert(`Bienvenido ${usuario.email}`);

      if (usuario.rol === "administrador" || usuario.rol === "vendedor") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "colec.html";
      }
  });
});
