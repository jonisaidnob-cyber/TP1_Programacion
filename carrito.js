document.addEventListener("DOMContentLoaded", function() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    const listaCarrito = document.getElementById("lista-carrito");
    const totalPrecio = document.getElementById("precio-total");
    const btnPagar = document.querySelector(".btn-ir-pagar");

    // Función para dibujar todo en pantalla
    function renderizarCarrito() {
        listaCarrito.innerHTML = ""; // Limpiamos primero
        let total = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
            if (btnPagar) btnPagar.style.display = "none";
            totalPrecio.textContent = "0";
            return;
        }

        if (btnPagar) btnPagar.style.display = "inline-block";

        // Recorremos cada producto y lo dibujamos
        carrito.forEach((producto, index) => {
            total += producto.precio;

            const divItem = document.createElement("div");
            divItem.classList.add("item-carrito");
            
            divItem.innerHTML = `
                <img src="${producto.imagen1}" alt="${producto.nombre}" class="img-carrito">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio}</p>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            
            listaCarrito.appendChild(divItem);
        });

        // Actualizamos el total sumando los precios
        totalPrecio.textContent = total.toLocaleString('es-AR');
        
        // Le damos función a todos los botones de "Eliminar"
        asignarBotonesEliminar();
    }

    // Función para borrar un producto
    function asignarBotonesEliminar() {
        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", function() {
                const posicion = this.getAttribute("data-index");
                
                carrito.splice(posicion, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                
                renderizarCarrito();
            });
        });
    }

    // Evento para ir a pagar: guarda el total y redirige al formulario unificado
    if (btnPagar) {
        btnPagar.addEventListener("click", function(e) {
            e.preventDefault();

            // Calculamos el total actual
            let totalGeneral = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);

            // Guardamos el total y los datos clave de la orden en el localStorage
            localStorage.setItem("totalCompra", totalGeneral);
            localStorage.setItem("resumenCompra", JSON.stringify(carrito));

            // Redirigimos al HTML de registro y pago unificado 
            // (Cambia "registro.html" por el nombre exacto de tu archivo HTML unificado)
            window.location.href = "nuevregistro.html"; 
        });
    }

    // Arrancamos la aplicación
    renderizarCarrito();
});