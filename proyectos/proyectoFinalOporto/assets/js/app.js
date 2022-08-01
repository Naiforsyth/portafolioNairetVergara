//Variables 
let navbar = document.querySelector('.navbar');
const cartItem = document.querySelector(".cart-items-container");
const carrito = document.querySelector("#carrito");
const listaMenu = document.querySelector("#box-container")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const spinner = document.querySelector("#spinner")
const btnComprar = document.querySelector("#btnComprar")
let articulosCarrito = [];
let productos = []
const URL = `assets/js/menu.json` 


//Eventos
document.querySelector("#cart-btn").onclick = () => {
  cartItem.classList.toggle('active');
}

document.querySelector("#cerrar-carrito").onclick = () => {
  cartItem.classList.remove("active")
}

cargarEventListener()

function cargarEventListener() {
  listaMenu.addEventListener("click", agregarProducto)
  carrito.addEventListener('click', eliminarProducto);
  vaciarCarritoBtn.addEventListener('click', vaciarTodoCarrito);
  btnComprar.addEventListener("click", guardarCarrito)
}

//Funciones

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    obtenerMenu(URL)
  }, 2000);
})
//Función para agregar productos en el carrito
function agregarProducto(e) {
  e.preventDefault()
  if (e.target.classList.contains("agregar-carrito")) {
    const producto = e.target.parentElement
    datosProducto(producto)
  }
}


//función almacenar los datos del producto a mostrar
function datosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h3").textContent,
    precio: producto.querySelector(".price").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1
  }
  const exist = articulosCarrito.some(producto => producto.id === infoProducto.id)
  if (exist) {
    const productos = articulosCarrito.map(producto => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    })
    articulosCarrito = [...productos] //Spread Arrays
  } else {
    articulosCarrito = [...articulosCarrito, infoProducto] //Spread Arrays
  }
  carritoHTML()
}

//Función para eliminar productos del carrito de compra
function eliminarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar-producto')) {
    const productoId = e.target.getAttribute('data-id')
    articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
    carritoHTML();
    swal.fire({
      icon: "error",
      text: "Haz eliminado un producto del carrito!"
    })
  }
}

//función para el template del producto en el carrito
function carritoHTML() {
  vaciarCarrito()
  articulosCarrito.forEach(producto => {
    guardarCarrito()
    const row = document.createElement("tr")
    row.innerHTML = `
                  <td>
                  <img src="${producto.imagen}" width=100>
                  </td>
                  <td>${producto.titulo}</td>
                  <td>${producto.precio}</td> 
                  <td>${producto.cantidad}</td> 
                  <td>
                  <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
                  </td>
                  
    `
    contenedorCarrito.appendChild(row)
  })
}


//Función para guardar SessionsStorage
function guardarCarrito() {
  if (articulosCarrito.length > 0) {
    sessionStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito))
  }
}

//Función para recuperar carritop del SessionStorage
function recuperarCarrito() {
  if (miCarrito = JSON.parse(sessionStorage.getItem("articulosCarrito"))) {
    miCarrito.forEach(producto => {
      articulosCarrito.push(producto)
    })
  }
}
recuperarCarrito()


//Función para borrar el carrito
function borrarCarrito() {
  if (articulosCarrito.length > 0) {
    vaciarCarrito()
  }
}

//función para vaciar carrito
function vaciarCarrito() {

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  sessionStorage.removeItem("articulosCarrito")
}

//Función para eliminar todos los productos
function vaciarTodoCarrito() {
  if (articulosCarrito.length >= 1) {
    contenedorCarrito.remove(contenedorCarrito)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Haz elimando el pedido!😅',
      showConfirmButton: true,
    }).then(function () {
      window.location.reload()
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Elije tu pedido!😉',
      showConfirmButton: true,
    }).then(function () {
      window.location.reload()
    })
  }
  sessionStorage.removeItem("articulosCarrito")
}