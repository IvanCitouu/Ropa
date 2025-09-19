document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registro-form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("registro-email").value.trim();
    const password = document.getElementById("registro-password").value.trim();
    const nombre = document.getElementById("registro-nombre").value.trim();
    const direccion = document.getElementById("registro-direccion").value.trim();
    const telefono = document.getElementById("registro-telefono").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.email === email);

    if (existe) {
      alert("Este correo ya está registrado");
      return;
    }

    usuarios.push({ email, password, nombre, direccion, telefono });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");
    window.location.href = "ini.html";
  });
});
