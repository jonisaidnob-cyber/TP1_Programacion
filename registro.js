// Esperamos a que todo el HTML se haya cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Obtenemos el formulario y el input de la contraseña
    const formulario = document.getElementById("registroForm");
    const inputPassword = document.getElementById("contra");
    
    // Escuchamos el evento 'submit' (cuando se presiona Confirmar)
    formulario.addEventListener("submit", (evento) => {
        // Evitamos que el formulario recargue la página por defecto
        evento.preventDefault(); 
        
        const password = inputPassword.value;
        
        /* Expresión regular para validar la contraseña:
           (?=.*[A-Z]) -> Exige al menos una letra mayúscula
           (?=.*[!@#$%^&*(),.?":{}|<>]) -> Exige al menos un carácter especial
           .{8,} -> Exige un mínimo de 8 caracteres en total
        */
        const regexPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        
        // Verificamos si la contraseña cumple con los requisitos
        if (!regexPassword.test(password)) {
            // Si no cumple, mostramos una alerta y detenemos el proceso
            alert("La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un carácter especial.");
            
            // Opcional: enfocar el cursor en el input de la contraseña para que el usuario corrija
            inputPassword.focus();
            return; 
        }
        
        // Si la contraseña es válida y todos los campos 'required' están listos:
        alert("Usuario generado con éxito");
        
        // Redirigimos a la página principal
        window.location.href = "index.html";
    });
});