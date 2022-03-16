// Seccion de "to-do":

let actividades = [];
let theNumber = 0;


function Actividad(nombre, precio){
    this.nombre = nombre;
    this.precio = precio
}

let divActividades = document.getElementById('listadecosas')
let formActividades = document.getElementById('form')
let elGasto = document.getElementById('elGasto')

if(localStorage.getItem("Actividades")){
    actividades = JSON.parse(localStorage.getItem("Actividades"));
    actividades.forEach((act, index) => {
        divActividades.innerHTML += `
        <div id="act${index}">
        <p>Nombre: ${act.nombre} Precio: ${act.precio} </p>
        <button type="submit" id="boton${index}"> Eliminar </button>
        </div>
        `
        theNumber += parseInt(act.precio);
        elGasto.innerHTML = `
        <p> ${theNumber} </p>
        `
    })
} else{
    localStorage.setItem("Actividades", actividades)
}


function Actividad(nombre, precio){
    this.nombre = nombre;
    this.precio = precio
}

formActividades.addEventListener("submit", (e) =>{
    e.preventDefault();
    let nombre = document.getElementById("actividad").value;
    let precio = document.getElementById("precio").value;
    
    let actividad = new Actividad(nombre, precio)

    actividades.push(actividad)

    let thisIndex = actividades.findIndex(activ => activ.nombre == nombre)
    localStorage.setItem("Actividades", JSON.stringify(actividades))
    
    divActividades.innerHTML += `
    <div id="act${thisIndex}">
    <p>Nombre: ${actividad.nombre} Precio: ${actividad.precio} </p>
    <button type="submit" id="boton${thisIndex}"> Eliminar </button>
    </div>
    `   
    theNumber += parseInt(actividad.precio);
    elGasto.innerHTML = `
    <p> ${theNumber} </p>
    `

    formActividades.reset()
})

actividades.forEach((act, index) =>{
    document.getElementById(`act${index}`).addEventListener('click', () =>{
        divActividades.removeChild(document.getElementById(`act${index}`))
        let indiceArray = actividades.findIndex(activ => activ.nombre == act.nombre);
        actividades.splice(indiceArray, 1);
        localStorage.setItem("Actividades", JSON.stringify(actividades))
        theNumber = theNumber - parseInt(act.precio);
        elGasto.innerHTML = `
        <p> ${theNumber} </p>
        `
    })
})


// Sección de presupuesto TODAVIA NOOOO
/*
let presupuestoViaje = 0;

function insertarPresupuesto() {
    let cantidad = parseInt(prompt("Cual es el presupuesto del viaje?"));
    presupuestoViaje = presupuestoViaje + cantidad
}

insertarPresupuesto();
console.log(presupuestoViaje)

function agregarPlata(){
    let cantidad = parseInt(prompt("Cuanto querés agregar?"));
    presupuestoViaje = presupuestoViaje + cantidad
}

// agregarPlata()

let misGastos = [];

function Gastos(nombre, gasto) {
    this.nombre = nombre;
    this.gasto = gasto;
}

function agregarGasto() {
    let gasto = prompt("Nombre del gasto")
    let cantidad = prompt("Valor")
    let nuevoGasto = new Gastos(gasto, cantidad)
    misGastos.push(nuevoGasto)
}

// agregarGasto()*/