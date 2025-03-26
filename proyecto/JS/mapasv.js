// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById("tooltip"); // Contenedor del tooltip
    const tooltipText = document.getElementById("tooltip-text"); // Texto dentro del tooltip
    const tooltipImg = document.getElementById("tooltip-img"); // Imagen dentro del tooltip
    
    document.querySelectorAll("path").forEach(departamento => {
        // Evento cuando el mouse pasa sobre un departamento
        departamento.addEventListener("mouseover", function (event) {
            tooltipText.textContent = this.dataset.info; // Muestra el texto del data
            tooltipImg.src = this.dataset.imagen; // Cambia la imagen según el data
            tooltip.style.display = "block"; // Muestra el cuadro al colocar el cursor
            tooltip.style.left = event.pageX + "px"; // Posiciona el cuadro 
            tooltip.style.top = event.pageY + "px";
        });
        
        // Evento para mover el cuadro por el mapa seleccionado con el cursor
        departamento.addEventListener("mousemove", function (event) {
            tooltip.style.left = event.pageX + "px";
            tooltip.style.top = event.pageY + "px";
        });
        
        // Evento cuando el mouse deja de estar sobre el departamento
        departamento.addEventListener("mouseleave", function () {
            tooltip.style.display = "none"; // Oculta el cuadro 
        });
    });
});


// CLASE PARA VALIDAR FORMULARIO
class Validador {
    // Valida que el nombre solo contenga letras y espacios
    static validarNombre(nombre) {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    }

    // Valida el formato del correo electrónico
    static validarEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    // Verifica que se haya seleccionado un país
    static validarPais(pais) {
        return pais !== "";
    }

    // Valida que el mensaje tenga al menos 10 caracteres
    static validarMensaje(mensaje) {
        return mensaje.length >= 10;
    }
}

// Evento que se ejecuta cuando se envía el formulario
document.getElementById("contacto").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Obtiene los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const pais = document.getElementById("pais").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    let valido = true; // Determinar si el formulario es válido

    // Validación del nombre
    if (!Validador.validarNombre(nombre)) {
        document.getElementById("error-nombre").textContent = "Nombre inválido (solo letras y espacios)";
        valido = false;
    } else {
        document.getElementById("error-nombre").textContent = "";
    }

    // Validación del correo electrónico
    if (!Validador.validarEmail(email)) {
        document.getElementById("error-email").textContent = "Correo inválido";
        valido = false;
    } else {
        document.getElementById("error-email").textContent = "";
    }

    // Validación del país seleccionado
    if (!Validador.validarPais(pais)) {
        document.getElementById("error-pais").textContent = "Debe seleccionar un país";
        valido = false;
    } else {
        document.getElementById("error-pais").textContent = "";
    }

    // Validación del mensaje
    if (!Validador.validarMensaje(mensaje)) {
        document.getElementById("error-mensaje").textContent = "El mensaje debe tener al menos 10 caracteres";
        valido = false;
    } else {
        document.getElementById("error-mensaje").textContent = "";
    }

    // Si todas las validaciones son correctas, se envía el formulario
    if (valido) {
        alert("Formulario enviado correctamente");
        this.reset(); // Limpia el formulario
    }
});

