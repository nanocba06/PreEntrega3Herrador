//Funciones para obtener datos de los productos y el carrito del Storage.
function guardarAlmacenamientoLocal(llave, valor_a_guardar){
  localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function obtenerAlmacenamientoLocal(llave){
  const datos = JSON.parse(localStorage.getItem(llave));
  return datos;
}

function guardarAlmacenamientoCarrito(llavec, valor_a_guardar_carrito){
  localStorage.setItem(llavec, JSON.stringify(valor_a_guardar_carrito));
}

function obtenerAlmacenamientoCarrito(llavec){
  const datos = JSON.parse(localStorage.getItem(llavec));
  return datos;
}

//Definimos los arreglos de productos y la lista del carrito.
let productos = obtenerAlmacenamientoLocal('productos') || [];
let lista = obtenerAlmacenamientoCarrito('lista') || [];

//Definimos elementos del DOM.
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x');
const finalizarCompra = document.getElementById('finalizarCompra');

let valortotal = 0;

window.addEventListener("scroll", function(){
    if(contenedor.getBoundingClientRect().top<8){
        header.classList.add("scroll");
    }
    else{
        header.classList.remove("scroll");
    }
})

//Creo evento para cargar productos automaticamente y renderizar los mismos.
window.addEventListener('load', () => {

  console.log(productos.length);

  //Si el listado de productos esta vacio cargo por defecto 6 articulos.
  if(productos.length === 0){
    console.log("Cargo Productos");

    jsonUrl = './json/productos.json';
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => cargarData(data))

    const cargarData = (data) => {
      console.log(data);

      for(let i = 0; i < data.length; i++){

        productos.push({
          nombre: data[i].nombre,
          valor: data[i].valor,
          stock: data[i].stock,
          urlImagen: data[i].urlImagen
      });
      }
      console.log("Info:");
      console.log(productos);
      guardarAlmacenamientoLocal('productos', productos);
      visualizarProductos();
      contenedorCompra.classList.add("none")
    }
  }
  
  visualizarProductos();
  if(lista.length > 0){
    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")
  }
  contenedorCompra.classList.add("none")
})

//Funcion para renderizar los productos cargados.
function visualizarProductos() {
  contenedor.innerHTML = ""
  for (let i = 0; i < productos.length; i++) {
      if (productos[i].stock > 0) {
          contenedor.innerHTML += `<div><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><button data-id="${i}" class="botonComprar">Comprar</button></div></div>`
      }
      else {
          contenedor.innerHTML += `<div><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><p class="soldOut">Sin Stock</p></div></div>`
      }
  }

  const botonesComprar = document.querySelectorAll(".botonComprar");

  for (const boton of botonesComprar) {
    boton.addEventListener("click", (event) => {
      // Evita el comportamiento default de HTML
      event.preventDefault();
      // Guardo el dataset ID que está en el HTML del botón Agregar al carrito
      const idProducto = Number(boton.dataset.id);
      
      // Llama al método agregar del carrito
      comprar(idProducto);
    });
  }
}

//Funcion para incorporar productos al carrito
function comprar(indice) {
  lista.push({ nombre: productos[indice].nombre, precio: productos[indice].valor})

  Toastify({
  text: productos[indice].nombre + " Agregado",
  className: "info",
  style: {
    background: "linear-gradient(to right, #819cc9, #2D4263)",
  }
}).showToast();

  let van = true
  let i = 0
  while (van == true) {
      if (productos[i].nombre == productos[indice].nombre) {
          productos[i].stock -= 1
          if (productos[i].stock == 0) {
              visualizarProductos()
          }
          van = false
      }
      guardarAlmacenamientoCarrito("lista", lista)
      i += 1
  }
  numero.innerHTML = lista.length
  numero.classList.add("diseñoNumero")
  return lista
}

carrito.addEventListener("click", function(){
  body.style.overflow = "hidden"
  contenedorCompra.classList.remove('none')
  contenedorCompra.classList.add('contenedorCompra')
  informacionCompra.classList.add('informacionCompra')
  mostrarCarritoLista()
})

//Funcion para renderizar el carrito
function mostrarCarritoLista() {
  productosCompra.innerHTML = ""
  valortotal = 0
  for (let i = 0; i < lista.length; i++){
      productosCompra.innerHTML += `<div><div class="img"><button data-id="${i}" class="botonTrash"><img src="img/trash.png"></button><p>${lista[i].nombre}</p></div><p> $${lista[i].precio}</p></div>`
      valortotal += parseInt(lista[i].precio)
  }
  total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`

  const botonesEliminar = document.querySelectorAll(".botonTrash");

  for (const boton of botonesEliminar) {
    boton.addEventListener("click", (event) => {
      // Evita el comportamiento default del html
      event.preventDefault();
      const idProducto = Number(boton.dataset.id);

      Swal.fire({
        title: 'Esta seguro de eliminar el producto?',
        text: "",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido retirado del carrito.',
            'success'
          )
          eliminar(idProducto);
        }
      })
    });
  }

}

//Funcion para eliminar productos del carrito
function eliminar(indice){
  let van = true
  let i = 0
  while (van == true) {
      if (productos[i].nombre == lista[indice].nombre) {
          productos[i].stock += 1
          lista.splice(indice, 1)
          van = false
      }
      i += 1
  }
  guardarAlmacenamientoCarrito("lista", lista)

  numero.innerHTML = lista.length
  if (lista.length == 0){
      numero.classList.remove("diseñoNumero")
  }
  visualizarProductos()
  mostrarCarritoLista()
}

//Evento para cerrar la ventana del carrito
x.addEventListener("click", function(){
  body.style.overflow = "auto"
  contenedorCompra.classList.add('none')
  contenedorCompra.classList.remove('contenedorCompra')
  informacionCompra.classList.remove('informacionCompra')
})

//Evento que llama a una alerta para la finalizacion de la compra
finalizarCompra.addEventListener("click", function(){
  if(lista.length===0){
    Swal.fire(
      'Carrito Vacío',
      'Por favor agregue productos!',
      'info'
    )
  }
  else{
    Swal.fire({
      title: 'Pago - Córdoba Tecno',
      text: 'Pasarela de Pago.',
      imageUrl: 'https://http2.mlstatic.com/frontend-assets/home-landing/logo-mercadopago.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Pasarela de Pago',
    })
  }

})