let edad = 25; 
const  nombre = "Juan Cruz"; 

let contador = 0 

for (let i = 0; i < 3; i++) {
      contador++; 
}
console.log(contador); 

const persona = {
      nombre:  "Juan", 
      edad:  25
}; 

persona.edad = 26; 

function ejemplo() {
var a = 1; 
var b = 2; 
const c = 3; 

if(true) {
      console.log("dentro del bloque:")
      console.log(a);
      console.log(b);
      console.log(c);
}

console.log("fuera del bloque: ")
console.log(a); 
console.log(b); 
console.log(c); 

}

ejemplo(); 


let frutas = ["manzana", "banana", "pera", "naranja", "uva"];
frutas.unshift("kiwi");
frutas.push("mango"); 
console.log(frutas); 

let numeros = [1, 2, 3, 4, 5]; 
let dobles = []; 
for(let i = 0; i  < numeros.length; i++) {
      dobles.push(numeros[i] * 2)
}
console.log(dobles); 

let colores1 = ["rojo","amarillo","verde"]
let colores2 = ["violeta", "purpura"]; 

let  coloresCombinados =  colores1.concat(colores2); 
console.log(coloresCombinados); 



let numeros2 = [1, 2, 3, 4, 5, 6]
let resultado = numeros.slice(1, numeros.length - 1);

console.log(resultado); 
console.log(numeros); 

let nombre = "Juan";
let edad = 25;
let profesion = "Diseñador";

let mensaje = `Hola, soy ${nombre}, tengo ${edad} años y soy ${profesion}.`;

console.log(mensaje);

function calcularTotal(precio, cantidad) {
      let total = precio * cantidad;
      return `El total es: ${total}`;
    }
    
    console.log(calcularTotal(100, 3)); // El total es: 300


function mostrarError(nombreError, descripcion) {
  return `Error: ${nombreError} - ${descripcion}`;
}

console.log(mostrarError("404", "Recurso no encontrado"));


//5
const saludar = nombre => `Hola, ${nombre}!`;

const cuadrado = n => n * n;

const mayor = (a, b) => (a > b ? a : b);

const cuadrados = arr => arr.map(n => n * n);


const numeros = [1, 2, 3, 4, 5, 6];
const pares = numeros.filter(n => n % 2 === 0);

const estudiantes = [
  { nombre: "Juan", edad: 20, nota: 8 },
  { nombre: "Ana", edad: 22, nota: 9 },
  { nombre: "Luis", edad: 24, nota: 7 }
];

const datos = estudiantes.map(e => ({
  nombre: e.nombre,
  edad: e.edad
}));

const personas = [
  { nombre: "Juan", edad: 20 },
  { nombre: "Ana", edad: 26 },
  { nombre: "Luis", edad: 30 }
];

const mayor25 = personas.find(p => p.edad > 25);

const suma = numeros.reduce((acc, n) => acc + n, 0);

const sumar = (...nums) => nums.reduce((acc, n) => acc + n, 0);


const max = Math.max(...numeros);


const obj1 = { nombre: "Juan" };
const obj2 = { edad: 25 };

const combinado = { ...obj1, ...obj2 };


const arr = [1, [2, 3], [4]];
const plano = arr.flat();

const persona = {
      nombre: "Juan",
      edad: 25,
      ciudad: "Buenos Aires"
    };
    
    const { nombre, edad } = persona;
    
    
    const mostrarPersona = ({ nombre, edad }) => `${nombre} tiene ${edad} años`;
    
    const ciudad = ["Buenos Aires", "Argentina", 3000000];
    
    const [nombreCiudad, pais, poblacion] = ciudad;
    