document.addEventListener('DOMContentLoaded', () => {

  // NAVEGACIÓN
  window.switchTab = (tabName) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    if (tabName === 'registro') {
      document.getElementById('sec-registro').classList.add('active');
      event.target.classList.add('active');
    } else {
      document.getElementById('sec-tienda').classList.add('active');
      event.target.classList.add('active');
      actualizarSelectorClientesCheckout();
    }
  };

  // --- MÓDULO 1: FORMULARIO DE REGISTRO & CRUD ---
  const registroForm = document.getElementById('registroForm');
  const tablaUsuarios = document.getElementById('tablaUsuarios');
  let usuarios = JSON.parse(localStorage.getItem('clientes_db')) || [];

  const patterns = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/,
    apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/,
    telefono: /^\d{10}$/,
    direccion: /^.{5,50}$/,
    localidad: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/,
    codigoPostal: /^[a-zA-Z0-9]{4,8}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  };

  function setFeedback(id, isValid, msg = '') {
    const group = document.getElementById(`group-${id}`);
    if (!group) return;
    const feedback = group.querySelector('.feedback');
    if (isValid) {
      group.classList.remove('error');
      group.classList.add('success');
      if (feedback) feedback.textContent = msg;
    } else {
      group.classList.remove('success');
      group.classList.add('error');
      if (feedback) feedback.textContent = msg;
    }
  }

  // Validación en tiempo real
  const fields = ['nombre', 'apellido', 'telefono', 'direccion', 'localidad', 'codigoPostal', 'email'];
  fields.forEach(field => {
    const input = document.getElementById(field);
    input?.addEventListener('input', () => {
      const isValid = patterns[field].test(input.value.trim());
      setFeedback(field, isValid, isValid ? 'Correcto' : 'Revise el formato ingresado');
    });
  });

  document.getElementById('provincia')?.addEventListener('change', (e) => {
    setFeedback('provincia', e.target.value !== '', e.target.value !== '' ? 'Provincia elegida' : 'Seleccione una provincia');
  });

  // Validación Cruzada: Fecha de Alta
  function validarFechaRegistro() {
    const valFecha = document.getElementById('fechaRegistro').value;
    if (!valFecha) {
      setFeedback('fechaRegistro', false, 'La fecha es obligatoria');
      return false;
    }

    const fechaIngresada = new Date(valFecha);
    const hoy = new Date();
    const fechaMin = new Date('2020-01-01');

    if (fechaIngresada > hoy) {
      setFeedback('fechaRegistro', false, 'La fecha no puede ser futura');
      return false;
    } else if (fechaIngresada < fechaMin) {
      setFeedback('fechaRegistro', false, 'Debe ser posterior a 2020');
      return false;
    } else {
      setFeedback('fechaRegistro', true, 'Fecha válida');
      return true;
    }
  }

  document.getElementById('fechaRegistro')?.addEventListener('change', validarFechaRegistro);

  function validarRadioCheck() {
    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    const prefs = document.querySelectorAll('input[name="preferencias"]:checked');
    setFeedback('tipoCliente', !!tipo, tipo ? 'Seleccionado' : 'Seleccione un tipo');
    setFeedback('preferencias', prefs.length > 0, prefs.length > 0 ? 'Seleccionado' : 'Seleccione al menos uno');
    return !!tipo && prefs.length > 0;
  }

  // Guardar / Editar Cliente en localStorage
  registroForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isAllValid = true;
    fields.forEach(field => {
      const val = document.getElementById(field).value.trim();
      const valid = patterns[field].test(val);
      setFeedback(field, valid, valid ? 'Correcto' : 'Campo obligatorio o invàlido');
      if (!valid) isAllValid = false;
    });

    const isProvValid = document.getElementById('provincia').value !== '';
    setFeedback('provincia', isProvValid, isProvValid ? 'Válido' : 'Seleccione provincia');

    const isFechaValid = validarFechaRegistro();
    const isGroupValid = validarRadioCheck();

    if (!isAllValid || !isProvValid || !isFechaValid || !isGroupValid) {
      alert('Corrija los campos señalados antes de guardar.');
      return;
    }

    const id = document.getElementById('userId').value;
    const tipoSel = document.querySelector('input[name="tipoCliente"]:checked');

    const clienteData = {
      id: id ? parseInt(id) : Date.now(),
      nombre: document.getElementById('nombre').value.trim(),
      apellido: document.getElementById('apellido').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      direccion: document.getElementById('direccion').value.trim(),
      localidad: document.getElementById('localidad').value.trim(),
      provincia: document.getElementById('provincia').value,
      codigoPostal: document.getElementById('codigoPostal').value.trim(),
      email: document.getElementById('email').value.trim(),
      fechaRegistro: document.getElementById('fechaRegistro').value,
      tipoCliente: tipoSel ? tipoSel.value : '',
      preferencias: Array.from(document.querySelectorAll('input[name="preferencias"]:checked')).map(cb => cb.value)
    };

    if (id) {
      usuarios = usuarios.map(u => u.id === parseInt(id) ? clienteData : u);
    } else {
      usuarios.push(clienteData);
    }

    localStorage.setItem('clientes_db', JSON.stringify(usuarios));
    resetForm();
    renderUsuarios();
    alert('Cliente guardado con éxito.');
  });

  function renderUsuarios() {
    if (!tablaUsuarios) return;
    tablaUsuarios.innerHTML = '';

    if (usuarios.length === 0) {
      tablaUsuarios.innerHTML = '<tr><td colspan="8" style="text-align:center;">No hay clientes registrados.</td></tr>';
      return;
    }

    usuarios.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${u.nombre} ${u.apellido}</strong></td>
        <td>${u.email}<br><small>${u.telefono}</small></td>
        <td>${u.localidad}, ${u.provincia}</td>
        <td>${u.direccion} (CP: ${u.codigoPostal})</td>
        <td>${u.tipoCliente}</td>
        <td>${u.preferencias.join(', ')}</td>
        <td>${u.fechaRegistro}</td>
        <td>
          <button onclick="editarUsuario(${u.id})">Editar</button>
          <button class="btn-danger" onclick="eliminarUsuario(${u.id})">Eliminar</button>
        </td>
      `;
      tablaUsuarios.appendChild(tr);
    });
  }

  window.editarUsuario = (id) => {
    const u = usuarios.find(item => item.id === id);
    if (!u) return;

    document.getElementById('userId').value = u.id;
    document.getElementById('nombre').value = u.nombre;
    document.getElementById('apellido').value = u.apellido;
    document.getElementById('telefono').value = u.telefono;
    document.getElementById('direccion').value = u.direccion;
    document.getElementById('localidad').value = u.localidad;
    document.getElementById('provincia').value = u.provincia;
    document.getElementById('codigoPostal').value = u.codigoPostal;
    document.getElementById('email').value = u.email;
    document.getElementById('fechaRegistro').value = u.fechaRegistro;

    document.querySelectorAll('input[name="tipoCliente"]').forEach(r => r.checked = r.value === u.tipoCliente);
    document.querySelectorAll('input[name="preferencias"]').forEach(c => c.checked = u.preferencias.includes(c.value));

    document.getElementById('btnGuardar').textContent = 'Actualizar Cliente';
    document.getElementById('btnCancelar').style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.eliminarUsuario = (id) => {
    if (confirm('¿Desea eliminar este cliente?')) {
      usuarios = usuarios.filter(u => u.id !== id);
      localStorage.setItem('clientes_db', JSON.stringify(usuarios));
      renderUsuarios();
    }
  };

  function resetForm() {
    registroForm.reset();
    document.getElementById('userId').value = '';
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('success', 'error'));
    document.getElementById('btnGuardar').textContent = 'Guardar Cliente';
    document.getElementById('btnCancelar').style.display = 'none';
  }

  document.getElementById('btnCancelar')?.addEventListener('click', resetForm);


  renderUsuarios();
  renderCatalogo();
  guardarYRenderizarCarrito();
  renderHistorial();
});

