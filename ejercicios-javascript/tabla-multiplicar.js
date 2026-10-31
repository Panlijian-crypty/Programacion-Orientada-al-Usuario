// Dado un número, crear un arreglo con su tabla de multiplicar del 1 al 10.

const numero = 1;
const tabla = [];

for (let i = 1; i <= 10; i++) {
  tabla.push(numero * i);
}

console.log(tabla);
