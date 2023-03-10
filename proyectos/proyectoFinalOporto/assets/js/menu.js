//Función para cargar menu
const retornoProducto = (producto) => {
  const {
    nombre,
    precio
  } = producto
  return `<div class=box>
            <img src="${producto.imagen}"/>
            <h3>${producto.nombre}</h3> 
            <a href="#" class="btn agregar-carrito" data-id="${producto.id}">agregar</a>            
            <div class="price"><span>${producto.precio}</span></div>
            </div>`
}

//Fetch y promesas
const obtenerMenu = (URL) => {
  let prodAMostrar = ""
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      for (producto of data) {
        prodAMostrar += retornoProducto(producto)
      }
      listaMenu.innerHTML = prodAMostrar
    })
    .catch((error) => alert("Error"))
    .finally(() => spinner.classList.remove("spinner"))

}