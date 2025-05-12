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
        // Crear un objeto con los datos del formulario
        const nuevoComentario = {
            nombre,
            email,
            pais,
            mensaje,
            fecha: new Date().toLocaleString()
        };

        // Obtener comentarios anteriores del localStorage
        let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

        // Agregar el nuevo comentario
            comentarios.push(nuevoComentario);

        // Guardar todo en localStorage como JSON
            localStorage.setItem("comentarios", JSON.stringify(comentarios));

        alert("Formulario enviado correctamente");
        this.reset(); // Limpia el formulario
    }
});

 //Comentarios guardados 
 document.addEventListener("DOMContentLoaded", () => {
    const contenedorComentarios = document.getElementById("comentarios-guardados");
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

    comentarios.forEach((comentario, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${comentario.nombre}</strong> (${comentario.email}) - ${comentario.fecha}</p>
            <p>${comentario.mensaje}</p>
            <button onclick="eliminarComentario(${index})">Eliminar comentario </button>
            <hr>
        `;
        contenedorComentarios.appendChild(div);
    });
});

function eliminarComentario(index) {
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.splice(index, 1);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    location.reload(); // Recargar para ver los cambios
}


document.addEventListener("DOMContentLoaded", () => {
    const departamentos = [
        { id: "ahuachapan", archivo: "ahuachapan.html" },
        { id: "santaana", archivo: "santaana.html" },
        { id: "sonsonate", archivo: "sonsonate.html" },
        { id: "chalatenango", archivo: "chalate.html" },
        { id: "lalibertad", archivo: "lalibertad.html" },
        { id: "cuscatlan", archivo: "cusca.html" },
        { id: "sansalvador", archivo: "sansalvador.html" },
        { id: "lapaz", archivo: "lapaz.html" },
        { id: "cabañas", archivo: "cabañas.html" },
        { id: "sanvicente", archivo: "sanvicente.html" },
        { id: "usulutan", archivo: "usulutan.html" },
        { id: "sanmiguel", archivo: "sanmiguel.html" },
        { id: "morazan", archivo: "morazan.html" },
        { id: "launion", archivo: "launion.html" }
    ];

    departamentos.forEach(dep => {
        const elemento = document.getElementById(dep.id);
        if (elemento) {
            elemento.style.cursor = "pointer";
            elemento.addEventListener("click", () => {
                window.location.href = dep.archivo;
            });
        }
    });
});


//Seccion de la barra de busqueda y 

document.addEventListener("DOMContentLoaded", () => {
    const departamentos = [
        { id: "ahuachapan", nombre: "Ahuachapán", archivo: "ahuachapan.html" },
        { id: "santa-ana", nombre: "Santa Ana", archivo: "santaana.html" },
        { id: "sonsonate", nombre: "Sonsonate", archivo: "sonsonate.html" },
        { id: "chalatenango", nombre: "Chalatenango", archivo: "chalate.html" },
        { id: "la-libertad", nombre: "La Libertad", archivo: "lalibertad.html" },
        { id: "cuscatlan", nombre: "Cuscatlán", archivo: "cusca.html" },
        { id: "san-salvador", nombre: "San Salvador", archivo: "sansalvador.html" },
        { id: "lapaz", nombre: "La Paz", archivo: "lapaz.html" },
        { id: "cabañas", nombre: "Cabañas", archivo: "cabañas.html" },
        { id: "san-vicente", nombre: "San Vicente", archivo: "sanvicente.html" },
        { id: "usulutan", nombre: "Usulután", archivo: "usulutan.html" },
        { id: "san-miguel", nombre: "San Miguel", archivo: "sanmiguel.html" },
        { id: "morazan", nombre: "Morazán", archivo: "morazan.html" },
        { id: "la-union", nombre: "La Unión", archivo: "launion.html" }
    ];

    departamentos.forEach(dep => {
        const path = document.getElementById(dep.id);
        if (path) {
            path.addEventListener("click", () => {
                window.location.href = dep.archivo;
            });
        }
    });

    const input = document.getElementById("buscador");
    const resultados = document.getElementById("resultados");

    input.addEventListener("input", () => {
        const texto = input.value.trim().toLowerCase();

    // Limpiar colores y resultados anteriores
        departamentos.forEach(dep => {
            const path = document.getElementById(dep.id);
            if (path) path.style.fill = ""; // reiniciar color
        });
        resultados.innerHTML = "";

        if (texto === "") return;

        const encontrados = departamentos.filter(dep => {
            return dep.nombre.toLowerCase().startsWith(texto);
        });

        if (encontrados.length > 0) {
            encontrados.forEach(dep => {
                const path = document.getElementById(dep.id);
                if (path) path.style.fill = "#9c9c9c"; // color 
            });
        } else {
            resultados.innerHTML = "";
        }
    });
});


//Agregando JSON en LocalStorage 



