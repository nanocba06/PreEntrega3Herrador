const header = document.querySelector("#header");
const contenedor = document.querySelector("#contenedor");
const body = document.querySelector("#body");

window.addEventListener("scroll", function(){
    if(contenedor.getBoundingClientRect().top<8){
        header.classList.add("scroll");
    }
    else{
        header.classList.remove("scroll");
    }
})

// Creamos un objeto que representa al producto
function Producto(nombre, marca, categoria, precio) {
    return {
      nombre: nombre,
      marca: marca,
      categoria: categoria,
      precio: precio
    };
  }
  
// Creamos un array para representar el carrito de compras
const carritoDeCompras = [];

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(nombre,marca,categoria,precio) {
    const nombreProducto = nombre;
    const marcaProducto = marca;
    const categoriaProducto = categoria;
    const precioProducto = parseFloat(precio);
  
    if (!isNaN(precioProducto)) {
      const nuevoProducto = Producto(nombreProducto, marcaProducto, categoriaProducto, precioProducto);
      carritoDeCompras.push(nuevoProducto);
      alert( `Producto ${nombreProducto} agregado al carrito.`);
    } else {
      alert("Precio inválido. Producto no agregado al carrito.");
    }

    console.log(carritoDeCompras);
}

// Función para mostrar el contenido del carrito
function mostrarCarritoDeCompras() {
  if (carritoDeCompras.length === 0) {
    alert("El carrito de compras está vacío.");
  } else {
    let contenidoCarrito = "Carrito de Compras:\n";
    let total = 0;
    for (let i = 0; i < carritoDeCompras.length; i++) {
      contenidoCarrito += (i + 1) + ". " + carritoDeCompras[i].nombre + " - $" + carritoDeCompras[i].precio.toFixed(2) + "\n";
      total += carritoDeCompras[i].precio;
    }
    contenidoCarrito += "\nTotal: $" + total.toFixed(2);
    alert(contenidoCarrito);
  }
}

// Función para mostrar el total del carrito
function calcularTotalCompra() {
  let total = 0;
  for (let i = 0; i < carritoDeCompras.length; i++) {
    total += carritoDeCompras[i].precio;
  }
  alert("El total de la compra es: $" + total.toFixed(2));
}

// Función para buscar productos en el carrito
function buscarProductoPorNombre() {
  let nombreBusqueda = prompt("Ingrese el nombre del producto a buscar en el carrito:");
  const productosEncontrados = [];

  console.log(nombreBusqueda);

  if(nombreBusqueda !== null){
    for (let i = 0; i < carritoDeCompras.length; i++) {
      if (carritoDeCompras[i].nombre.toLowerCase().includes(nombreBusqueda.toLowerCase())) {
        productosEncontrados.push(carritoDeCompras[i]);
      }
    }
  }

  if (productosEncontrados.length === 0) {
    alert("No se encontraron productos que coincidan con la búsqueda.");
  } else {
    let contenidoProductosEncontrados = "Productos encontrados en el carrito:\n";
    let total = 0;
    for (let j = 0; j < productosEncontrados.length; j++) {
      contenidoProductosEncontrados += (j + 1) + ". " + productosEncontrados[j].nombre + " - $" + productosEncontrados[j].precio.toFixed(2) + "\n";
      total += productosEncontrados[j].precio;
    }
    contenidoProductosEncontrados += "\nTotal: $" + total.toFixed(2);
    alert(contenidoProductosEncontrados);
  }
}

//agregarProductoAlCarrito('ROG Strix G15','Asus','Notebook',1399.99)