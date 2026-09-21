document.addEventListener("DOMContentLoaded", function() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    const listaCarrito = document.getElementById("lista-carrito");
    const totalPrecio = document.getElementById("precio-total");
    const btnPagar = document.querySelector(".btn-ir-pagar");

    // 1.Agrupa productos repetidos y les asigna una "cantidad"
    function agregarProductosRepetidos() {
        let carritoProduAgrup = [];
        carrito.forEach(producto => {
            let existente = carritoProduAgrup.find(item => item.id === producto.id);
            if (existente) {
                existente.cantidad = (existente.cantidad || 1) + 1;
            } else {
                producto.cantidad = producto.cantidad || 1;
                carritoProduAgrup.push(producto);
            }
        });
        
        carrito = carritoProduAgrup;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // 2. FUNCIÓN PARA DIBUJAR LA PANTALLA
    function renderizarCarrito() {
        listaCarrito.innerHTML = ""; 
        let total = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<p>El carrito está vacío. ¡Agregá algunos productos!</p>";
            btnPagar.style.display = "none";
            totalPrecio.textContent = "0";
            return;
        }

        btnPagar.style.display = "inline-block";

        carrito.forEach((producto, index) => {
            let subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const divItem = document.createElement("div");
            divItem.classList.add("item-carrito");
            
            divItem.innerHTML = `
                <img src="${producto.imagen1}" alt="${producto.nombre}" class="img-carrito">
                
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>Precio unitario: $${producto.precio.toLocaleString('es-AR')}</p>
                    
                    <!-- Controles de cantidad -->
                    <div class="control-cantidad">
                       <button class="btn-restar" data-index="${index}" ${producto.cantidad === 1 ? 'disabled' : ''}>-</button>
                        <span class="cantidad-numero">${producto.cantidad}</span>
                        <button class="btn-sumar" data-index="${index}">+</button>
                    </div>
                </div>

                <div class="acciones-producto">
                    <p><strong>$${subtotal.toLocaleString('es-AR')}</strong></p>
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                </div>
            `;
            
            listaCarrito.appendChild(divItem);
        });

        totalPrecio.textContent = total.toLocaleString('es-AR');
        
        // Llamamos a la función que le da vida a los botones
        asignarEventos();
    }

    // 3. FUNCIÓN PARA DARLE VIDA A LOS BOTONES (+, -, Eliminar)
    function asignarEventos() {
        // Botón Eliminar
        document.querySelectorAll(".btn-eliminar").forEach(boton => {
            boton.addEventListener("click", function() {
                const posicion = this.getAttribute("data-index");
                carrito.splice(posicion, 1);
                actualizarStorageYPantalla();
            });
        });

        // Botón Sumar (+)
        document.querySelectorAll(".btn-sumar").forEach(boton => {
            boton.addEventListener("click", function() {
                const posicion = this.getAttribute("data-index");
                carrito[posicion].cantidad++;
                actualizarStorageYPantalla();
            });
        });

       // Botón Restar (-)
        document.querySelectorAll(".btn-restar").forEach(boton => {
            boton.addEventListener("click", function() {
                const posicion = this.getAttribute("data-index");
                
                // Solo resta si hay más de 1. Si hay 1, ignora el clic.
                if (carrito[posicion].cantidad > 1) {
                    carrito[posicion].cantidad--;
                    actualizarStorageYPantalla();
                }
            });
        });
    }

    // 4. FUNCIÓN AUXILIAR: Guarda los cambios y redibuja
    function actualizarStorageYPantalla() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    }

    // --- ARRANQUE DE LA APLICACIÓN ---
    agregarProductosRepetidos();
    renderizarCarrito();
});