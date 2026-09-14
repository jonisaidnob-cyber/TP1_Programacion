//Muestra los productos en la página principal

//let productos = localStorage.getItem(JSON.parse('productos'));

const listaProductos = document.getElementById("listaProductos");

function mostrarProducto(producto){
    const nuevoContenedorProducto = document.createElement("div");
    nuevoContenedorProducto.classList.add("contenedorProducto");
    listaProductos.appendChild(nuevoContenedorProducto);

    const nuevaImagen = document.createElement("img");
    nuevoContenedorProducto.appendChild(nuevaImagen);
    nuevaImagen.src = producto.imagen1;
    nuevaImagen.classList.add("productoImagen");

    const nuevaDescripcion = document.createElement("p");
    nuevoContenedorProducto.appendChild(nuevaDescripcion);
    nuevaDescripcion.textContent = producto.descripcion;

    const nuevoPrecio = document.createElement("p");
    nuevoContenedorProducto.appendChild(nuevoPrecio);
    nuevoPrecio.textContent = "$" + producto.precio;

    const nuevoBotonCarrito = document.createElement("button");
    nuevoContenedorProducto.appendChild(nuevoBotonCarrito);
    nuevoBotonCarrito.textContent = "Agregar al Carrito";
    nuevoBotonCarrito.classList.add("botonAgregarAlCarrito");
    nuevoBotonCarrito.addEventListener("click", function(){
        agregarAlCarrito(producto);
    });
}

function agregarAlCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

for(let i = 0; i < 3; i++){
    mostrarProducto(productos[i]);
}
