//Variables 
const carritoCompra = document.querySelector("#carrito-compra")
const hacerCompra = document.querySelector("#comprar")
const totalCompra = document.querySelector("#totalCompra")
const eliminarCompra = document.querySelector("#eliminar")




//funciones
cargarEventListenerCompra()

function cargarEventListenerCompra() {
  hacerCompra.addEventListener("click", realizarCompra)
  eliminarCompra.addEventListener("click", borrarCompra)
}

//Función para recuperar carrito del index
function recuperoCarrito() {
  if (sessionStorage.getItem("articulosCarrito")) {
    const articulosCarrito = JSON.parse(sessionStorage.getItem("articulosCarrito"))
    articulosCarrito.forEach(producto => {
      const row = document.createElement("div")
      row.innerHTML = `
                  <div class= cart-card>                  
                  <img  src="${producto.imagen}"/>
                  <div class = cart-card-content>
                  <h3>${producto.titulo}</h3>
                  <form action = "">
                  <span>cantidad</span>
                  <input disabled  type = text value= "${producto.cantidad}">
                  </form> 
                  <div class= cart-card-price>
                  <div><span>${producto.precio}</span></div>
                  </div>
                  </div>
                  </div>
                  `
      carritoCompra.appendChild(row)
    })
  }
}
recuperoCarrito()



//Función para calcular el total 
function sumarTotal() {
  totalCompra.innerText = ""
  if (sessionStorage.getItem("articulosCarrito")) {
    const articulosCarrito = JSON.parse(sessionStorage.getItem("articulosCarrito"))
    const nCantidad = articulosCarrito.reduce((acc, {
      cantidad
    }) => acc + cantidad, 0)
    const nprecio = articulosCarrito.reduce((acc, {
      cantidad,
      precio
    }) => acc + cantidad * precio, 0)
    totalCompra.innerHTML = `$${nprecio}`
  }

}
sumarTotal()


//Función para mostrar mensaje al hacer la compra
function realizarCompra(e) {
  if (sessionStorage.length === 0) {
    e.preventDefault()
    Swal.fire({
      title: "Ooops!😅",
      text: "Realiza un pedido para confirmar tu compra!! 😊",
      showConfirmButton: true,
    }).then(function () {
      window.location = "index.html";
    })
    
  } else {
    
    Swal.fire({
      title: "Tu pedido esta en camino!! 🛵",
      text: "Gracias por su compra!! 😃",
      showConfirmButton: true,
    }).then(function () {
      window.location = "index.html";
    })
    sessionStorage.removeItem("articulosCarrito")
    carritoCompra.innerHTML = ""
    totalCompra.innerHTML = ""
  }
}

//Función para eliminar Compra
function borrarCompra() {
  if (sessionStorage.getItem("articulosCarrito")) {
    const articulosCarrito = JSON.parse(sessionStorage.getItem("articulosCarrito"))
    if (articulosCarrito.length >= 1) {
      carritoCompra.innerHTML = ""
      totalCompra.innerHTML = ""
      sessionStorage.removeItem("articulosCarrito")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Haz elimando el pedido!',
        showConfirmButton: true,
      }).then(function () {
        window.location = "index.html";
      })
    }
  }
}