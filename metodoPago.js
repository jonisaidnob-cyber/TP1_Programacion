
document.addEventListener('DOMContentLoaded', function() {
    const selectMetodo = document.getElementById('metodoPago');
    const infoEfectivo = document.getElementById('infoEfectivo');
    const infoTarjeta = document.getElementById('infoTarjeta');
    const infoTransferencia = document.getElementById('infoTransferencia');

    if (selectMetodo) {
        selectMetodo.addEventListener('change', function() {
            // Ocultar todas las secciones primero
            infoEfectivo.style.display = 'none';
            infoTarjeta.style.display = 'none';
            infoTransferencia.style.display = 'none';

            // Mostrar la sección correspondiente según la elección
            const valorSeleccionado = this.value;

            if (valorSeleccionado === 'efectivo') {
                infoEfectivo.style.display = 'block';
            } else if (valorSeleccionado === 'debito' || valorSeleccionado === 'credito') {
                infoTarjeta.style.display = 'block';
            } else if (valorSeleccionado === 'transferencia') {
                infoTransferencia.style.display = 'block';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const pagar = document.getElementById('confirmar');
  if (confirmar) {
    pagar.addEventListener('click', () => {
      alert('¡Compra confirmada! Gracias por su compra.');
      localStorage.removeItem('carrito');
      window.location.href = 'index.html';
    });
  }
});