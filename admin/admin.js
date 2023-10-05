function guardarAlmacenamientoLocal(llave, valor_a_guardar){
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function obtenerAlmacenamientoLocal(llave){
    const datos = JSON.parse(localStorage.getItem(llave));
    return datos;
}

let productos = obtenerAlmacenamientoLocal('productos') || [];
let mensaje = document.getElementById('mensaje');

const añadirProducto = document.getElementById('productoAñadir');
const añadirValor = document.getElementById('valorAñadir');
const añadirStock = document.getElementById('stockAñadir');
const añadirImagen = document.getElementById('imagenAñadir');


//Añadir Producto
document.getElementById("botonAñadir").addEventListener("click", function (event) {
    event.preventDefault();

    let productoAñadir = añadirProducto.value;
    let valorAñadir = añadirValor.value;
    let stockAñadir = añadirStock.value;
    let imagenAñadir = añadirImagen.value;

    let van = true;

    if(productoAñadir == "" || valorAñadir == "" || stockAñadir == "" || imagenAñadir == ""){
        mensaje.classList.add('llenarCampos');
        setTimeout(() => {mensaje.classList.remove('llenarCampos')}, 2500);
        van = false;
    }
    else {
        for(let i = 0; i < productos.length; i++){
            if(productos[i].nombre == productoAñadir){
                mensaje.classList.add('repetidoError');
                setTimeout(() => {mensaje.classList.remove('repetidoError')}, 2500);
                van = false;
            }
        }
    }

    if(van == true){
        productos.push({
            nombre: productoAñadir,
            valor: valorAñadir,
            stock: stockAñadir,
            urlImagen: imagenAñadir
        })
        mensaje.classList.add('realizado');
        setTimeout(() => {mensaje.classList.remove('realizado'); window.location.reload();}, 1500);
    }
    guardarAlmacenamientoLocal('productos', productos);
})

//Editar
const productoEd = document.getElementById('productoEditar');
const atributoEd = document.getElementById('atributoEditar');
const nuevoAtributoEd = document.getElementById('nuevoAtributo');

document.getElementById("botonEditar").addEventListener("click", function(event){
    event.preventDefault(); //evita que se recargue la pagina 

    let productoEditar = productoEd.value;
    let atributoEditar = atributoEd.value;
    let nuevoAtributo = nuevoAtributoEd.value;

    let van = false;

    if(productoEditar == "" || atributoEditar == "" || nuevoAtributo == ""){
        mensaje.classList.add('llenarCampos');
        setTimeout(() => {mensaje.classList.remove('llenarCampos')}, 2500);
    }
    else{
        for(let i = 0; i < productos.length; i++){
            if(productos[i].nombre == productoEditar){
                productos[i][atributoEditar] = nuevoAtributo;
                van = true;
            }
        }
        if(van == true){
            mensaje.classList.add('realizado');
            setTimeout(()=>{
                mensaje.classList.remove('realizado');
                window.location.reload();
            }, 1500)
        }
        else{
            mensaje.classList('noExisteError');
            setTimeout(() => {mensaje.classList.remove('noExisteError')}, 2500);
        }
        guardarAlmacenamientoLocal('productos', productos);
    }
})

//Eliminar
const productoE = document.getElementById('productoEliminar')

document.getElementById("botonEliminar").addEventListener("click", function(event){
    event.preventDefault();
    let productoEliminar = productoE.value;
    let van = false;

    for (let i = 0; i < productos.length; i++){
        if(productos[i].nombre == productoEliminar){
            productos.splice(i, 1);
            van = true;
        }
    }

    if (van == false) {
        mensaje.classList.add('noExsiteError')
        setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
    }
    else {
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('realizado')
            window.location.reload()
        }, 1500);
    }

    guardarAlmacenamientoLocal('productos', productos);
})

// mostrar productos

window.addEventListener("load", () =>{
    const productoEd = document.getElementById('productoEditar');
    const productoEl = document.getElementById('productoEliminar');

    for (let i = 0; i < productos.length; i++) {
        productoEd.innerHTML += `<option>${productos[i].nombre}</option>`;
        productoEl.innerHTML += `<option>${productos[i].nombre}</option>`;
    }

    Object.keys(productos[0]).forEach(element => {
        atributoEd.innerHTML += `<option>${element}</option>`;
    });

    let mostrarProductos = document.getElementById('mostrarProductos');
    mostrarProductos.innerHTML = "";
    
    for (let i = 0; i < productos.length; i++){
        mostrarProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio"><span>Precio: ${productos[i].valor}$</span></p>Existencia: ${productos[i].stock}</p></div></div>`;
    }
})

console.log(productos);