document.addEventListener("DOMContentLoaded", function() {
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
            <button id="btn-agregar-detalle" class="btn-ir-pagar">Agregar al carrito</button>
        </div>
    `;

    
 // 5. Lógica del botón "Agregar al carrito" de esta página
    document.getElementById("btn-agregar-detalle").addEventListener("click", function() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
 
        const boton = document.getElementById("btn-agregar-detalle");
        
       
        const textoOriginal = boton.textContent; 
        
       
        boton.textContent = "¡Agregado con éxito! ✅";
        boton.style.backgroundColor = "#1b5e20"; 
        boton.style.color = "white";

        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.style.backgroundColor = ""; 
        }, 2000);
    });
});


window.cambiarImagen = function(rutaImagen) {
    document.getElementById("img-principal").src = rutaImagen;
}