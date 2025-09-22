document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuarioActivo || !["administrador", "vendedor"].includes(usuarioActivo.rol)) {
  alert("Acceso restringido.");
  window.location.href = "colec.html";
  return;
}

if (usuarioActivo.rol === "vendedor") {
  // Ocultar vista de usuarios
  const vistaUsuarios = document.getElementById("vista-usuarios");
  if (vistaUsuarios) vistaUsuarios.style.display = "none";

  const linkUsuarios = document.querySelector('[data-vista="usuarios"]');
  if (linkUsuarios) linkUsuarios.style.display = "none";

  // Ocultar formularios de creación
  document.querySelectorAll(".solo-admin").forEach(el => el.style.display = "none");

  // Ocultar botones de edición/eliminación
  document.querySelectorAll(".admin-only").forEach(btn => btn.style.display = "none");

  // Ocultar otras vistas
  const vistasNoPermitidas = ["perfil", "crear-producto", "crear-usuario"];
  vistasNoPermitidas.forEach(v => {
    const vista = document.getElementById("vista-" + v);
    if (vista) vista.style.display = "none";

    const link = document.querySelector(`[data-vista="${v}"]`);
    if (link) link.style.display = "none";
  });
}

  // Navegación entre vistas
  const links = document.querySelectorAll(".sidebar a[data-vista]");
  const vistas = document.querySelectorAll(".vista");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const vistaId = "vista-" + link.dataset.vista;
      vistas.forEach(v => v.classList.remove("active"));
      document.getElementById(vistaId).classList.add("active");
    });
  });

  // Cerrar sesión
  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    window.location.href = "pagp.html";
  });

  // Mostrar usuarios
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const tablaUsuarios = document.getElementById("tabla-usuarios");
  usuarios.forEach((u, i) => {
  tablaUsuarios.innerHTML += `
    <tr>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>
        <select onchange="cambiarRolUsuario(${i}, this.value)">
          <option value="administrador" ${u.rol === "administrador" ? "selected" : ""}>Administrador</option>
          <option value="vendedor" ${u.rol === "vendedor" ? "selected" : ""}>Vendedor</option>
          <option value="cliente" ${u.rol === "cliente" ? "selected" : ""}>Cliente</option>
        </select>
      </td>
      <td><button onclick="eliminarUsuario(${i})">Eliminar</button></td>
    </tr>
  `;
});

  // Mostrar productos
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const tablaProductos = document.getElementById("tabla-productos");
  productos.forEach((p, i) => {
  tablaProductos.innerHTML += `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.precio}</td>
      <td>${p.stock}</td>
      <td>${p.descripcion}</td>
      <td>${p.estado}</td>
      <td>${p.categoria}</td>
      <td><img src="${p.imagen}" alt="${p.nombre}" width="50"></td>
      <td>
        <button onclick="editarProducto(${i})" class="admin-only">Editar</button>
        <button onclick="eliminarProducto(${i})" class="admin-only">Eliminar</button>
      </td>
    </tr>
  `;
});

if (usuarioActivo.rol === "vendedor") {
  document.querySelectorAll(".admin-only").forEach(btn => btn.style.display = "none");
}

  // Mostrar órdenes
  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
const tablaOrdenes = document.getElementById("tabla-ordenes");

ordenes.forEach((o, i) => {
  tablaOrdenes.innerHTML += `
    <tr>
      <td>${o.id}</td>
      <td>${o.cliente}</td>
      <td>$${o.total.toLocaleString("es-CL")}</td>
      <td>
        ${
          usuarioActivo.rol === "administrador"
            ? `<select onchange="actualizarEstadoOrden(${i}, this.value)" class="admin-only">
                <option value="Pendiente" ${o.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                <option value="Enviado" ${o.estado === "Enviado" ? "selected" : ""}>Enviado</option>
                <option value="Cancelado" ${o.estado === "Cancelado" ? "selected" : ""}>Cancelado</option>
              </select>`
            : `<span>${o.estado}</span>`
        }
      </td>
    </tr>
  `;
});

  document.getElementById("form-nuevo-usuario").addEventListener("submit", e => {
  e.preventDefault();

  const run = document.getElementById("nuevo-run").value.trim().toUpperCase();
  const nombre = document.getElementById("nuevo-nombre").value.trim();
  const apellidos = document.getElementById("nuevo-apellidos").value.trim();
  const email = document.getElementById("nuevo-email").value.trim();
  const fecha = document.getElementById("nuevo-fecha").value;
  const rol = document.getElementById("nuevo-rol").value;
  const region = document.getElementById("nuevo-region").value;
  const comuna = document.getElementById("nuevo-comuna").value;
  const direccion = document.getElementById("nuevo-direccion").value.trim();

  // Validación RUN
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

    if (!rol) {
      alert("Debe seleccionar un tipo de usuario.");
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

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.run === run);
    if (existe) return alert("Ese RUN ya está registrado");

    usuarios.push({ run, nombre, apellidos, email, fecha, rol, region, comuna, direccion });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario creado correctamente");
    location.reload();
  });

  let productoEditando = null;

    document.getElementById("form-nuevo-producto").addEventListener("submit", e => {
  e.preventDefault();

  const codigo = document.getElementById("nuevo-codigo-prod").value.trim();
  const nombre = document.getElementById("nuevo-nombre-prod").value.trim();
  const descripcion = document.getElementById("nuevo-descripcion-prod").value.trim();
  const precio = parseFloat(document.getElementById("nuevo-precio-prod").value);
  const stock = parseInt(document.getElementById("nuevo-stock-prod").value);
  const stockCritico = document.getElementById("nuevo-stock-critico-prod").value.trim();
  const categoria = document.getElementById("nuevo-categoria-prod").value;
  const estado = document.getElementById("nuevo-estado-prod").value;
  const archivo = document.getElementById("nuevo-img-prod").files[0];

  if (!archivo) {
    alert("Debe seleccionar una imagen");
    return;
  }

  if (codigo.length < 3 || !nombre || nombre.length > 100 || descripcion.length > 500 ||
      isNaN(precio) || precio < 0 || !Number.isInteger(stock) || stock < 0 ||
      (stockCritico && (!Number.isInteger(parseInt(stockCritico)) || parseInt(stockCritico) < 0)) ||
      !categoria || !estado) {
    alert("Por favor completa todos los campos correctamente");
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    const imagenBase64 = reader.result;

    const nuevoProducto = {
      codigo,
      nombre,
      descripcion,
      precio,
      stock,
      stockCritico: stockCritico ? parseInt(stockCritico) : null,
      categoria,
      estado,
      imagen: imagenBase64
    };

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const productoEditando = localStorage.getItem("productoEditando");
    const indice = productoEditando !== null ? parseInt(productoEditando) : null;

    if (indice !== null) {
      productos[indice] = nuevoProducto;
      localStorage.removeItem("productoEditando");
      alert("Producto actualizado correctamente");
    } else {
      const existe = productos.some(p => p.codigo === codigo);
      if (existe) {
        alert("Ya existe un producto con ese código");
        return;
      }
      productos.push(nuevoProducto);
      alert("Producto creado correctamente");
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    location.reload();
  };

  reader.readAsDataURL(archivo);
});

  // Función para editar producto
  window.editarProducto = function(index) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const p = productos[index];

  localStorage.setItem("productoEditando", index);

  document.getElementById("nuevo-codigo-prod").value = p.codigo;
  document.getElementById("nuevo-nombre-prod").value = p.nombre;
  document.getElementById("nuevo-descripcion-prod").value = p.descripcion;
  document.getElementById("nuevo-precio-prod").value = p.precio;
  document.getElementById("nuevo-stock-prod").value = p.stock;
  document.getElementById("nuevo-stock-critico-prod").value = p.stockCritico ?? "";
  document.getElementById("nuevo-categoria-prod").value = p.categoria;
  document.getElementById("nuevo-estado-prod").value = p.estado ?? "";

  document.querySelector(".vista").classList.remove("active");
  document.getElementById("vista-productos").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  // Función para eliminar usuario
  window.eliminarUsuario = function(index) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario eliminado");
    location.reload();
  };

  // Función para eliminar producto
  window.eliminarProducto = function(index) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    alert("Producto eliminado");
    location.reload();
  };
});

const regionesYComunas = {
  "Región Metropolitana": ["Santiago", "Melipilla", "Puente Alto", "Maipú"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quillota"],
  "Biobío": ["Concepción", "Los Ángeles", "Chillán"]
};

const regionSelect = document.getElementById("nuevo-region");
const comunaSelect = document.getElementById("nuevo-comuna");

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

window.actualizarEstadoOrden = function(index, nuevoEstado) {
  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
  ordenes[index].estado = nuevoEstado;
  localStorage.setItem("ordenes", JSON.stringify(ordenes));
  alert(`Estado de la orden ${ordenes[index].id} actualizado a "${nuevoEstado}"`);
};

window.cambiarRolUsuario = function(index, nuevoRol) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios[index].rol = nuevoRol;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert(`Rol actualizado a "${nuevoRol}" para ${usuarios[index].nombre}`);
};