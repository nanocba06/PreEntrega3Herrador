function guardarAlmacenamientoLocal(llave, valor_a_guardar){
  localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function obtenerAlmacenamientoLocal(llave){
  const datos = JSON.parse(localStorage.getItem(llave));
  return datos;
}

let productos = obtenerAlmacenamientoLocal('productos') || [];

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

let lista = [];
let valortotal = 0;

window.addEventListener("scroll", function(){
    if(contenedor.getBoundingClientRect().top<8){
        header.classList.add("scroll");
    }
    else{
        header.classList.remove("scroll");
    }
})

window.addEventListener('load', () => {

  console.log(productos);

  if(productos.length === 0){
    console.log("Cargo Productos");

    productos.push({
      nombre: "Samsung S20 FE",
      valor: 520,
      stock: 12,
      urlImagen: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2020/10/X1008276-920x613.jpg"
  });

  productos.push({
    nombre: "Iphone 14",
    valor: 990,
    stock: 5,
    urlImagen: "https://www.digitaltrends.com/wp-content/uploads/2022/10/iphone-14-pro-max-hero-photo.jpg"
  });

  productos.push({
    nombre: "Ipad Pro 11",
    valor: 600,
    stock: 0,
    urlImagen: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/03/persona-sujetando-ipad-pro-11-pulgadas-1883545.jpg"
  });
  
  productos.push({
    nombre: "Play Station 5",
    valor: 1000,
    stock: 6,
    urlImagen: "https://topesdegama.com/app/uploads-topesdegama.com/2022/08/PS5.jpg"
  });

  productos.push({
    nombre: "Moto G13",
    valor: 230,
    stock: 10,
    urlImagen: "https://images.expertreviews.co.uk/wp-content/uploads/2023/07/motorola-moto-g13-review-4_0.jpg"
  });
  
  productos.push({
    nombre: "Macbook Pro 13",
    valor: 1500,
    stock: 15,
    urlImagen: "https://i.blogs.es/d4848b/analisis-macbook-pro-13-2020-applesfera-07/1366_2000.jpg"
  });   

  guardarAlmacenamientoLocal('productos', productos);

  }
  else{
    console.log("No cargo nada");
  }
  visualizarProductos();
  contenedorCompra.classList.add("none")
})

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
      // Uso el método de la base de datos para ubicar el producto según el ID
      
      // Llama al método agregar del carrito
      comprar(idProducto);
    });
  }
}

function comprar(indice) {
  lista.push({ nombre: productos[indice].nombre, precio: productos[indice].valor})

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
      guardarAlmacenamientoLocal("productos", productos)
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
      // Evita el comportamiento default de HTML
      event.preventDefault();
      // Guardo el dataset ID que está en el HTML del botón Agregar al carrito
      const idProducto = Number(boton.dataset.id);
      // Uso el método de la base de datos para ubicar el producto según el ID
      
      // Llama al método agregar del carrito
      eliminar(idProducto);
    });
  }
}

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
  guardarAlmacenamientoLocal("productos", productos)

  numero.innerHTML = lista.length
  if (lista.length == 0){
      numero.classList.remove("diseñoNumero")
  }
  visualizarProductos()
  mostrarCarritoLista()
}

x.addEventListener("click", function(){
  body.style.overflow = "auto"
  contenedorCompra.classList.add('none')
  contenedorCompra.classList.remove('contenedorCompra')
  informacionCompra.classList.remove('informacionCompra')
})