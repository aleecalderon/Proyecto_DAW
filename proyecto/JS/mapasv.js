document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById("tooltip");
    const tooltipText = document.getElementById("tooltip-text");
    const tooltipImg = document.getElementById("tooltip-img");
    
    document.querySelectorAll("path").forEach(departamento => {
        departamento.addEventListener("mouseover", function (event) {
            tooltipText.textContent = this.dataset.info;
            tooltipImg.src = this.dataset.imagen;
            tooltip.style.display = "block";
            tooltip.style.left = event.pageX + "px";
            tooltip.style.top = event.pageY + "px";
        });
        
        departamento.addEventListener("mousemove", function (event) {
            tooltip.style.left = event.pageX + "px";
            tooltip.style.top = event.pageY + "px";
        });
        
        departamento.addEventListener("mouseleave", function () {
            tooltip.style.display = "none";
        });
    });
});
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

//FORMULARIO 
class Validador {
    static validarNombre(nombre) {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    }

    static validarEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    static validarPais(pais) {
        return pais !== "";
    }

    static validarMensaje(mensaje) {
        return mensaje.length >= 10;
    }
}

document.getElementById("contacto").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const pais = document.getElementById("pais").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    let valido = true;

    if (!Validador.validarNombre(nombre)) {
        document.getElementById("error-nombre").textContent = "Nombre inválido (solo letras y espacios)";
        valido = false;
    } else {
        document.getElementById("error-nombre").textContent = "";
    }

    if (!Validador.validarEmail(email)) {
        document.getElementById("error-email").textContent = "Correo inválido";
        valido = false;
    } else {
        document.getElementById("error-email").textContent = "";
    }

    if (!Validador.validarPais(pais)) {
        document.getElementById("error-pais").textContent = "Debe seleccionar un país";
        valido = false;
    } else {
        document.getElementById("error-pais").textContent = "";
    }

    if (!Validador.validarMensaje(mensaje)) {
        document.getElementById("error-mensaje").textContent = "El mensaje debe tener al menos 10 caracteres";
        valido = false;
    } else {
        document.getElementById("error-mensaje").textContent = "";
    }

    if (valido) {
        alert("Formulario enviado correctamente");
        this.reset();
    }
});

