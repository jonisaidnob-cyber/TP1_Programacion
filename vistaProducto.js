document.addEventListener("DOMContentLoaded", function () {
    const cantidadDeProductos = document.getElementById("cantidadDeProductos");
    cantidadDeProductos.textContent = actualizarCantidadCarrito();

    const contenedorDetalle = document.getElementById("detalle-producto");

    //Lee qué ID guardó el inicio.js
    const idSeleccionado = localStorage.getItem("productoSeleccionado");

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    const producto = productos.find(item => item.id == idSeleccionado);


    if (!producto) {
        contenedorDetalle.innerHTML = "<h2>No se seleccionó ningún producto. Volvé al inicio.</h2>";
        return;
    }


    contenedorDetalle.innerHTML = `
        <div class="galeria-producto">
            <img src="${producto.imagen1}" alt="${producto.nombre}" id="img-principal" class="img-principal">
            
            <div class="miniaturas">
                <img src="${producto.imagen1}" class="miniatura" onclick="cambiarImagen('${producto.imagen1}')">
                <img src="${producto.imagen2}" class="miniatura" onclick="cambiarImagen('${producto.imagen2}')">
                <img src="${producto.imagen3}" class="miniatura" onclick="cambiarImagen('${producto.imagen3}')">
            </div>
        </div>

        <div class="info-detalle">
            <h2>${producto.nombre}</h2>
            <p class="descripcion-detalle">${producto.descripcion}</p>
            <h3 class="precio-detalle">$${producto.precio.toLocaleString('es-AR')}</h3>
            <div id="contenedorBotonesRestaSuma" class="controlCantidad">
                <button class="btn-restar">-</button>
                <span id="textoCantidad">0</span>
                <button class="btn-sumar">+</button>
            </div>
            <button id="btn-agregar-detalle" class="btn-ir-pagar">Agregar al carrito</button>
        </div>
    `;

    const contenedorBotonesRestaSuma = document.getElementById("contenedorBotonesRestaSuma");
    const botonMenos = document.querySelector(".btn-restar");
    const botonMas = document.querySelector(".btn-sumar");
    const textoCantidad = document.getElementById("textoCantidad");
    textoCantidad.textContent = actualizarCantidad(producto, 0);

    const botonAgregar = document.getElementById("btn-agregar-detalle");
    actualizarVisibilidadBotones();

    // 5. Lógica del botón "Agregar al carrito" de esta página
    botonAgregar.addEventListener("click", function () {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoEnCarrito = carrito.find(p => p.id === producto.id);

        if (!productoEnCarrito) {
            carrito.push({
                ...producto,
                cantidad: 1
            });
            localStorage.setItem("carrito", JSON.stringify(carrito));

            cantidadDeProductos.textContent = actualizarCantidadCarrito();
            textoCantidad.textContent = "1";

            const boton = document.getElementById("btn-agregar-detalle");


            const textoOriginal = boton.textContent;


            boton.textContent = "¡Agregado con éxito! ✅";
            boton.style.backgroundColor = "#1b5e20";
            boton.style.color = "white";

            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.backgroundColor = "";
                actualizarVisibilidadBotones();
            }, 2000);
        }
    });

    botonMenos.addEventListener("click", function () {
        textoCantidad.textContent = actualizarCantidad(producto, -1);
        cantidadDeProductos.textContent = actualizarCantidadCarrito();
        actualizarVisibilidadBotones();
    });

    botonMas.addEventListener("click", function () {
        textoCantidad.textContent = actualizarCantidad(producto, 1);
        cantidadDeProductos.textContent = actualizarCantidadCarrito();
    });

    function actualizarCantidadCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let cantidad = 0;

        carrito.forEach(produc => {
            cantidad += produc.cantidad;
        });

        return cantidad;
    }

    function actualizarCantidad(produc, cambio) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoEnCarrito = carrito.find(p => p.id === produc.id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cambio;

            if (productoEnCarrito.cantidad <= 0) {
                carrito = carrito.filter(p => p.id !== producto.id);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            return productoEnCarrito.cantidad;
        }
    }

    function actualizarVisibilidadBotones() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoEnCarrito = carrito.find(p => p.id === producto.id);

        if (productoEnCarrito) {
            contenedorBotonesRestaSuma.style.display = "flex";
            botonAgregar.style.display = "none";
        }
        else {
            contenedorBotonesRestaSuma.style.display = "none";
            botonAgregar.style.display = "flex";
        }
    }
});


window.cambiarImagen = function (rutaImagen) {
    document.getElementById("img-principal").src = rutaImagen;
}