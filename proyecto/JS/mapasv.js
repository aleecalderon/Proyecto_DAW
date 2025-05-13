document.addEventListener("DOMContentLoaded", () => {
// Obtiene los elementos del tooltip: el contenedor, el texto y la imagen
    const tooltip = document.getElementById("tooltip");
    const tooltipText = document.getElementById("tooltip-text");
    const tooltipImg = document.getElementById("tooltip-img");

// Recorre todos los elementos <path> del mapa SVG (cada uno representa un departamento)
    document.querySelectorAll("path").forEach(departamento => {
        departamento.addEventListener("mouseover", function (event) {
            tooltipText.textContent = this.dataset.info;
            tooltipImg.src = this.dataset.imagen;

            // Muestra el tooltip SIN colocarlo justo bajo el cursor
            $(tooltip).stop(true, true).fadeIn(200).css({
                left: event.pageX + 15 + "px", 
                top: event.pageY + 15 + "px"   
            });
        });

        departamento.addEventListener("mousemove", function (event) {
            tooltip.style.left = event.pageX + 15 + "px";
            tooltip.style.top = event.pageY + 15 + "px";
        });

        departamento.addEventListener("mouseleave", function () {
            $(tooltip).stop(true, true).fadeOut(200); // Evita que el tooltip parpadee si hay movimientos rápidos del mouse
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

//Se utiliza en el formulario y sus validaciones jQuery y AJAX 
$("#contacto").on("submit", function (event) {
    event.preventDefault(); //evita que el formulario se recargue 

    const nombre = $("#nombre").val().trim();
    const email = $("#email").val().trim();
    const pais = $("#pais").val();
    const mensaje = $("#mensaje").val().trim();

    let valido = true;

    if (!Validador.validarNombre(nombre)) {
        $("#error-nombre").text("Nombre inválido (solo letras y espacios)");
        valido = false;
    } else {
        $("#error-nombre").text("");
    }

    if (!Validador.validarEmail(email)) {
        $("#error-email").text("Correo inválido");
        valido = false;
    } else {
        $("#error-email").text("");
    }

    if (!Validador.validarPais(pais)) {
        $("#error-pais").text("Debe seleccionar un país");
        valido = false;
    } else {
        $("#error-pais").text("");
    }

    if (!Validador.validarMensaje(mensaje)) {
        $("#error-mensaje").text("El mensaje debe tener al menos 10 caracteres");
        valido = false;
    } else {
        $("#error-mensaje").text("");
    }

    if (valido) {
        const nuevoComentario = {
            nombre,
            email,
            pais,
            mensaje,
            fecha: new Date().toLocaleString()
        };

        let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push(nuevoComentario);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        // Mostrar mensaje del comentario  
        $("<p class='exito'>Comentario enviado correctamente</p>").insertBefore("#contacto").fadeOut(3000);
        this.reset();

        // Recargar la sección de comentarios sin recargar toda la página
        mostrarComentarios();
    }
});

// Función para mostrar todos los comentarios guardados en localStorage
function mostrarComentarios() {
     // Obtiene los comentarios desde localStorage 
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    const $contenedor = $("#comentarios-guardados");
    $contenedor.empty();

     // Recorre cada comentario y lo agrega al contenedor 
    comentarios.forEach((comentario, index) => {
        $contenedor.append(`
            <div>
                <p><strong>${comentario.nombre}</strong> (${comentario.email}) - ${comentario.fecha}</p>
                <p>${comentario.mensaje}</p>
                <button class="eliminar-comentario" data-index="${index}">Eliminar comentario</button>
                <hr>
            </div>
        `);
    });
}

function eliminarComentario(index) {
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.splice(index, 1);
    // Guarda la nueva lista de comentarios sin el eliminado
    localStorage.setItem("comentarios", JSON.stringify(comentarios)); 
    // Recarga la página para actualizar la vista
    location.reload(); 
}

//Evento para que al dar click en el departamento lo lleve a su respectivo html sin necesidad de colocar href 
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
    $(document).ready(() => {
        mostrarComentarios();
    
        $(document).on("click", ".eliminar-comentario", function () {
            const index = $(this).data("index");
            let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
            comentarios.splice(index, 1);
            localStorage.setItem("comentarios", JSON.stringify(comentarios));
            mostrarComentarios();
        });
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


