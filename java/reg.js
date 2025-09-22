document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registro-form");

  // Regiones y comunas
  const regionesYComunas = {
    "Región Metropolitana": ["Santiago", "Melipilla", "Puente Alto", "Maipú"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quillota"],
    "Biobío": ["Concepción", "Los Ángeles", "Chillán"]
  };

  const regionSelect = document.getElementById("reg-region");
  const comunaSelect = document.getElementById("reg-comuna");

  Object.keys(regionesYComunas).forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });

  regionSelect.addEventListener("change", () => {
    const comunas = regionesYComunas[regionSelect.value] || [];
    comunaSelect.innerHTML = "";
    comunas.forEach(comuna => {
      const option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
  });

  // Validación y registro
  form.addEventListener("submit", e => {
    e.preventDefault();

    const run = document.getElementById("reg-run").value.trim().toUpperCase();
    const nombre = document.getElementById("reg-nombre").value.trim();
    const apellidos = document.getElementById("reg-apellidos").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const fecha = document.getElementById("reg-fecha").value;
    const region = document.getElementById("reg-region").value;
    const comuna = document.getElementById("reg-comuna").value;
    const direccion = document.getElementById("reg-direccion").value.trim();
    const password = document.getElementById("reg-password").value;

    // Validar RUN
    const runValido = /^[0-9]{7,8}[0-9K]$/i;
    if (!runValido.test(run)) {
      alert("RUN inválido. Debe tener entre 7 y 9 caracteres, sin puntos ni guión.");
      return;
    }

    if (!nombre || nombre.length > 50) {
      alert("Nombre requerido, máximo 50 caracteres.");
      return;
    }

    if (!apellidos || apellidos.length > 100) {
      alert("Apellidos requeridos, máximo 100 caracteres.");
      return;
    }

    if (!email || email.length > 100) {
      alert("Correo requerido, máximo 100 caracteres.");
      return;
    }

    const dominioValido = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
    if (!dominioValido.test(email)) {
      alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }

    if (!region || !comuna) {
      alert("Debe seleccionar región y comuna.");
      return;
    }

    if (!direccion || direccion.length > 300) {
      alert("Dirección requerida, máximo 300 caracteres.");
      return;
    }

    if (!password || password.length < 6) {
      alert("Contraseña requerida, mínimo 6 caracteres.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.run === run || u.email === email);
    if (existe) {
      alert("Ese RUN o correo ya está registrado");
      return;
    }

    usuarios.push({
      run,
      nombre,
      apellidos,
      email,
      fecha,
      region,
      comuna,
      direccion,
      password,
      rol: "cliente"
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro exitoso");
    window.location.href = "ini.html";
  });
});