const prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];

function calcularTasaDeInteres(nCuotas) {
  return nCuotas >= 6 ? 0.6 : 0.5;
}

function simularPrestamo() {
  const nombreInput = document.getElementById("nombre");
  const montoInput = document.getElementById("monto");
  const cuotasInput = document.getElementById("cuotas");

  const nombre = nombreInput.value;
  const montoTotal = Number(montoInput.value);
  const numeroCuotas = Number(cuotasInput.value);

  // Validar que el número de cuotas sea positivo
  if (numeroCuotas <= 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El número de cuotas debe ser mayor que cero",
    });
    return;
  }

  const tasaInteres = calcularTasaDeInteres(numeroCuotas);

  const interesTotal = montoTotal * tasaInteres;
  const totalPagar = montoTotal + interesTotal;
  const valorCuota = totalPagar / numeroCuotas;

  const usuario = {
    nombre: nombre,
    monto: montoTotal,
    cuota: valorCuota.toFixed(2),
    cuotas: numeroCuotas,
    totalPagar: totalPagar.toFixed(2),
  };

  prestamos.push(usuario);
  localStorage.setItem("prestamos", JSON.stringify(prestamos));

  Swal.fire({
    icon: "success",
    title: "¡Préstamo simulado con éxito!",
  }).then(() => {
    // Actualizar la tabla después de presionar aceptar en SweetAlert
    listarPrestamos();
  });
}

function listarPrestamos() {
  const cuerpoTabla = document.getElementById("cuerpoTabla");
  cuerpoTabla.innerHTML = "";

  prestamos.forEach((usuario) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${usuario.nombre}</td>
                      <td>${usuario.monto}</td>
                      <td>${usuario.cuota}</td>
                      <td>${usuario.cuotas}</td>
                      <td>${usuario.totalPagar}</td>`;
    cuerpoTabla.appendChild(fila);
  });
}

function filtrarPorCuotas(cuotasCondicion) {
  const cuerpoTabla = document.getElementById("cuerpoTabla");
  cuerpoTabla.innerHTML = "";

  prestamos.forEach((usuario) => {
    if (cuotasCondicion(usuario.cuotas)) {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td>${usuario.nombre}</td>
                        <td>${usuario.monto}</td>
                        <td>${usuario.cuota}</td>
                        <td>${usuario.cuotas}</td>
                        <td>${usuario.totalPagar}</td>`;
      cuerpoTabla.appendChild(fila);
    }
  });
}

// Función para obtener la hora actual utilizando Fetch
async function obtenerHora() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const data = await response.json();
    const hora = data.datetime.slice(11, 19); // Extraer solo la hora
    const pais = data.timezone.split("/")[1]; // Obtener el nombre del país
    document.getElementById("hora").textContent = `Hora actual: ${hora} (${pais})`;
  } catch (error) {
    console.error("Error al obtener la hora:", error);
  }
}

// Llamar a la función para obtener la hora al cargar la página
obtenerHora();

// Actualizar la hora cada segundo
setInterval(obtenerHora, 1000);

// Mostrar los préstamos almacenados al cargar la página
listarPrestamos();

const simularBtn = document.getElementById("simularBtn");
const listarBtn = document.getElementById("listarBtn");
const filtrarMayorBtn = document.getElementById("filtrarMayorBtn");
const filtrarMenorBtn = document.getElementById("filtrarMenorBtn");

simularBtn.addEventListener("click", simularPrestamo);
listarBtn.addEventListener("click", listarPrestamos);
filtrarMayorBtn.addEventListener("click", () =>
  filtrarPorCuotas((cuotas) => cuotas > 5)
);
filtrarMenorBtn.addEventListener("click", () =>
  filtrarPorCuotas((cuotas) => cuotas <= 5)
);
