// Seccion de "to-do":

let actividades = [];
let theNumber = 0;


function Actividad(nombre, precio){
    this.nombre = nombre;
    this.precio = precio
}

let divActividades = document.getElementById('listadecosas')
let formActividades = document.getElementById('formAct')
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

    Toastify({
        text: "Se agregó la actividad",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

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


// Sección de Presupuesto y Gastos

let presupuestoViaje = 0;

let formPresup = document.getElementById('formPresup')
let elPresu = document.getElementById('elPresu')
let elDispo = document.getElementById('elDispo')
let botonUsd = document.getElementById('usd')
let cotizacion = document.getElementById('cotizacion')

if(localStorage.getItem("Presup")){
    presu = JSON.parse(localStorage.getItem("Presup"));
    presupuestoViaje = presu;
    console.log(presupuestoViaje)
    elPresu.innerHTML = `
        <p> ${presupuestoViaje} </p>
        `
} else{
    localStorage.setItem("Presup", presupuestoViaje)
}

formPresup.addEventListener("submit", (e) =>{
    e.preventDefault();
    let cantidad = document.getElementById("cantPresup").value;

    presupuestoViaje = presupuestoViaje + parseInt(cantidad)

    localStorage.setItem("Presup", JSON.stringify(presupuestoViaje))
    
    elPresu.innerHTML = `
        <p> ${presupuestoViaje} </p>
        `
    Toastify({
        text: "Se actualizó tu presupuesto",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
        }).showToast();

    formPresup.reset()
})

botonUsd.addEventListener("click", (e) =>{
    e.preventDefault();
    fetch('https://criptoya.com/api/dolar')
    .then((promesa) => promesa.json())
    .then(data =>{
        let {oficial, blue, solidario} = data;
        cotizacion.innerHTML = `
        <p>Oficial: $${oficial}</p>
        <p>Blue: $${blue}</p>
        <p>Solidario: $${solidario}</p>
        `
    })
})
 
let gastos = [];
let divGastos = document.getElementById('listadegastos')
let formGasto = document.getElementById('formGasto')
let gastoTotal = 0;
let disponible = presupuestoViaje - gastoTotal

function Gasto(nombre, precio){
    this.nombre = nombre;
    this.precio = precio
}

elDispo.innerHTML = `
<p> ${disponible} </p>
`


if(localStorage.getItem("Gastos")){
    gastos = JSON.parse(localStorage.getItem("Gastos"));
    gastos.forEach((gast, index) => {
        divGastos.innerHTML += `
        <div id="gasto${index}">
        <p>Nombre: ${gast.nombre} Precio: ${gast.precio} </p>
        </div>
        `
        gastoTotal += parseInt(gast.precio);
        elDispo.innerHTML = `
        <p> ${disponible} </p>
        `
    })
} else{
    localStorage.setItem("Gastos", gastos)
}

formGasto.addEventListener("submit", (e) =>{
    e.preventDefault();
    let nombre = document.getElementById("nombreGasto").value;
    let precio = document.getElementById("precioGasto").value;
    
    let gasto = new Gasto(nombre, precio)

    gastos.push(gasto)

    let thisIndex = gastos.findIndex(gast => gast.nombre == nombre)
    localStorage.setItem("Gastos", JSON.stringify(gastos))
    
    divGastos.innerHTML += `
    <div id="gast${thisIndex}">
    <p>Nombre: ${gasto.nombre} Precio: ${gasto.precio} </p>
    </div>
    `   
    gastoTotal += parseInt(gasto.precio);

    elDispo.innerHTML = `
    <p> ${disponible} </p>
    `

    Toastify({
        text: "Se agregó tu gasto",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    formActividades.reset()
})
