const prestamos = [];

function calcularTasaDeInteres(nCuotas) {
  return nCuotas >= 6 ? 0.6 : 0.5;
}

function simularPrestamo() {
  const nombre = prompt("Ingrese su nombre");
  const montoTotal = Number(prompt("Ingrese el monto del préstamo"));
  const numeroCuotas = Number(prompt("Ingrese número de cuotas del préstamo"));

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

  alert("Préstamo simulado con éxito");
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

