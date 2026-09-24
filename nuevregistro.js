document.addEventListener("DOMContentLoaded", () => {
  const selectMetodoPago = document.getElementById("metodoPago");
  const btnPagar = document.getElementById("pagar");
  
  const infoEfectivo = document.getElementById("infoEfectivo");
  const infoTarjeta = document.getElementById("infoTarjeta");
  const infoTransferencia = document.getElementById("infoTransferencia");

  // Mostrar u ocultar secciones según el método de pago seleccionado
  function actualizarMetodoPago() {
    if (!selectMetodoPago) return;
    const valor = selectMetodoPago.value;

    if (infoEfectivo) infoEfectivo.style.display = "none";
    if (infoTarjeta) infoTarjeta.style.display = "none";
    if (infoTransferencia) infoTransferencia.style.display = "none";

    if (valor === "efectivo" && infoEfectivo) {
      infoEfectivo.style.display = "block";
    } else if ((valor === "debito" || valor === "credito") && infoTarjeta) {
      infoTarjeta.style.display = "block";
    } else if (valor === "transferencia" && infoTransferencia) {
      infoTransferencia.style.display = "block";
    }
  }

  if (selectMetodoPago) {
    selectMetodoPago.addEventListener("change", actualizarMetodoPago);
    selectMetodoPago.addEventListener("input", actualizarMetodoPago);
  }

  // Validación de contraseña
  function validarPassword(pass) {
    const minLength = pass.length >= 8;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    return minLength && hasSpecial && hasUpper;
  }

  // Acción del botón de pago
  if (btnPagar) {
    btnPagar.addEventListener("click", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const direccion = document.getElementById("direccion").value.trim();
      const localidad = document.getElementById("localidad").value.trim();
      const provincia = document.getElementById("provincia").value;
      const codigoPostal = document.getElementById("codigoPostal").value.trim();
      const email = document.getElementById("email").value.trim();
      const fechaRegistro = document.getElementById("fechaRegistro").value;
      
      const tipoClienteNode = document.querySelector('input[name="tipoCliente"]:checked');
      const tipoCliente = tipoClienteNode ? tipoClienteNode.value : "";

      const password = document.getElementById("contra").value;
      const metodoPago = selectMetodoPago ? selectMetodoPago.value : "";

      if (!nombre || !apellido || !telefono || !direccion || !localidad || !provincia || !codigoPostal || !email || !fechaRegistro || !tipoCliente || !metodoPago) {
        alert("Por favor, complete todos los campos obligatorios del formulario.");
        return;
      }

      if (telefono.length !== 10 || isNaN(telefono)) {
        alert("El teléfono debe tener exactamente 10 dígitos numéricos.");
        return;
      }

      if (!validarPassword(password)) {
        alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial. Será utilizada al momento de la entrega/retiro del/los productos");
        return;
      }

      let datosPago = { metodo: metodoPago };
      if (metodoPago === "debito" || metodoPago === "credito") {
        const numTarjeta = document.getElementById("numTarjeta").value.trim();
        const vencimiento = document.getElementById("vencimiento").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        const titular = document.getElementById("titular").value.trim();

        if (!numTarjeta || !vencimiento || !cvv || !titular) {
          alert("Por favor, complete todos los datos de la tarjeta.");
          return;
        }

        datosPago.numTarjeta = numTarjeta;
        datosPago.vencimiento = vencimiento;
        datosPago.titular = titular;
      }

      const carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];
      const totalCompra = localStorage.getItem("totalCompra") || 0;

      const clienteData = {
        id: document.getElementById("userId").value || Date.now().toString(),
        nombre,
        apellido,
        telefono,
        direccion,
        localidad,
        provincia,
        codigoPostal,
        email,
        fechaRegistro,
        tipoCliente,
        password,
        datosPago,
        productos: carritoCompra,
        total: totalCompra
      };

      let clientes = JSON.parse(localStorage.getItem("clientesRegistrados")) || [];
      clientes.push(clienteData);
      localStorage.setItem("clientesRegistrados", JSON.stringify(clientes));

      localStorage.removeItem("carrito");
      localStorage.removeItem("totalCompra");
      localStorage.removeItem("resumenCompra");

      alert("Compra confirmada, se ha enviado la factura a su email. Recuerde que deberá aportar la contraseña para su retiro/entrega");
      window.location.href = "index.html";
    });
  }
});