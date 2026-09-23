//Muestra los productos en la página principal

//let productos = localStorage.getItem(JSON.parse('productos'));

const listaProductos = document.getElementById("listaProductos");

function mostrarProducto(producto) {
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
    nuevoPrecio.textContent = "$" + producto.precio.toLocaleString('es-AR');

    //Botón para agregar el producto al carrito si no está
    const nuevoBotonCarrito = document.createElement("button");
    nuevoContenedorProducto.appendChild(nuevoBotonCarrito);
    nuevoBotonCarrito.textContent = "Agregar al Carrito";
    nuevoBotonCarrito.classList.add("botonAgregarAlCarrito");
    nuevoBotonCarrito.addEventListener("click", function () {
        agregarAlCarrito(producto);
        visibilidadDeBotones(producto, nuevoBotonCarrito, contenedorCantidad);
        textoCantidad.textContent = 1;
    });

    //Botones para modificar la cantidad del producto en el carrito si ya fue agragado
    const contenedorCantidad = document.createElement("div");
    contenedorCantidad.classList.add("controlCantidad");
    nuevoContenedorProducto.appendChild(contenedorCantidad);

    const botonMenos = document.createElement("button");
    botonMenos.textContent = "-";
    contenedorCantidad.appendChild(botonMenos);
    botonMenos.classList.add("btn-restar");
    botonMenos.addEventListener("click", function () {
        textoCantidad.textContent = actualizarCantidad(producto, -1);
        visibilidadDeBotones(producto, nuevoBotonCarrito, contenedorCantidad);

    })

    const textoCantidad = document.createElement("span");
    textoCantidad.textContent = "1";
    contenedorCantidad.appendChild(textoCantidad);

    const botonMas = document.createElement("button");
    botonMas.textContent = "+";
    contenedorCantidad.appendChild(botonMas);
    botonMas.classList.add("btn-sumar");
    botonMas.addEventListener("click", function () {
        textoCantidad.textContent = actualizarCantidad(producto, 1);
    })

    visibilidadDeBotones(producto, nuevoBotonCarrito, contenedorCantidad);
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoEnCarrito = carrito.find(p => p.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad = 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCantidad(producto, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoEnCarrito = carrito.find(p => p.id === producto.id);

    if(productoEnCarrito){
        productoEnCarrito.cantidad += cambio;

        if(productoEnCarrito.cantidad <= 0){
            carrito = carrito.filter(p => p.id !== producto.id);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        
        return productoEnCarrito.cantidad;
    }
}

function visibilidadDeBotones(producto, nuevoBotonCarrito, contenedorCantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoEnCarrito = carrito.find(p => p.id === producto.id);

    if (productoEnCarrito) {
        nuevoBotonCarrito.style.display = "none";
        contenedorCantidad.style.display = "flex";
    }
    else {
        nuevoBotonCarrito.style.display = "flex";
        contenedorCantidad.style.display = "none";
    }
}

for (let i = 0; i < productos.length; i++) {
    mostrarProducto(productos[i]);
}
