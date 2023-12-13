// Funciones

function calcularTasaDeInteres(nCuotas) {
  let tInteres;
  if (nCuotas >= 6) {
    tInteres = 0.6;
  } else if (nCuotas <= 5) {
    tInteres = 0.5;
  }
  return tInteres;
}

//Información del usuario

const nombre = prompt("Ingrese su nombre");
const montoTotal = Number(prompt("Ingrese el monto del préstamo"));
const numeroCuotas = Number(prompt("Ingrese número de cuotas del préstamo"));

// Calcular el interés 0.5% de la cuota

const tasaInteres=  calcularTasaDeInteres(numeroCuotas)

const interesTotal = montoTotal * tasaInteres;
const totalPagar = montoTotal + interesTotal;
const valorCuota = totalPagar / numeroCuotas;
const mensaje = `
    Nombre: ${nombre} 
    Préstamo: ${montoTotal}
    Cuóta: ${valorCuota}
    Números de Cuotas: ${numeroCuotas}
`;
alert(mensaje);
