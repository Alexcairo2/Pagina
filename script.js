// Espera a que la página cargue para mostrar los comentarios guardados
document.addEventListener("DOMContentLoaded", function() {
    cargarComentarios();
});

// Función para agregar comentario
document.getElementById("formulario-comentarios").addEventListener("submit", function(event) {
    event.preventDefault();
    agregarComentario();
});

// Permitir enviar con Enter sin salto de línea
document.getElementById("comentario").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey) { 
        event.preventDefault();
        agregarComentario();
    }
});

// Agregar comentario a localStorage y a la vista
function agregarComentario() {
    let nombre = document.getElementById("nombre").value.trim();
    let comentario = document.getElementById("comentario").value.trim();

    if (nombre && comentario) {
        let idComentario = new Date().getTime();

        let nuevoComentario = {
            id: idComentario,
            nombre: nombre,
            comentario: comentario
        };

        // Guardar en localStorage
        let comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentariosGuardados.push(nuevoComentario);
        localStorage.setItem("comentarios", JSON.stringify(comentariosGuardados));

        agregarComentarioDOM(nuevoComentario);
        document.getElementById("formulario-comentarios").reset();
    }
}

// Función para agregar un comentario al DOM
function agregarComentarioDOM(comentarioObj) {
    let comentarioDiv = document.createElement("div");
    comentarioDiv.classList.add("comentario");
    comentarioDiv.setAttribute("data-id", comentarioObj.id);

    comentarioDiv.innerHTML = `
        <img src="https://github.com/Alexcairo2/Pagina/blob/paginatest/Imagenes/usuario.png?raw=true" alt="Avatar">
        <div class="comentario-texto">
            <strong>${comentarioObj.nombre}:</strong> <br> ${comentarioObj.comentario}
        </div>
        <button class="eliminar-btn">🗑</button>
    `;

    // Evento para eliminar comentario
    comentarioDiv.querySelector(".eliminar-btn").addEventListener("click", function() {
        eliminarComentario(comentarioObj.id);
        comentarioDiv.remove();
    });

    document.getElementById("comentarios-container").appendChild(comentarioDiv);
}

function cargarComentarios() {
    let comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
    
    // Asegurarte de que no se muestre el JSON crudo
    document.getElementById("comentarios-container").innerHTML = "";

    comentariosGuardados.forEach(comentario => agregarComentarioDOM(comentario));
}
// Cargar comentarios desde localStorage
//function cargarComentarios() {
    //let comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
    //comentariosGuardados.forEach(comentario => agregarComentarioDOM(comentarios));
//}


// Eliminar un comentario
function eliminarComentario(id) {
    let comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
    let nuevosComentarios = comentariosGuardados.filter(comentario => comentario.id !== id);
    localStorage.setItem("comentarios", JSON.stringify(nuevosComentarios));
}


//Carrucel de imagenes
let indice = 0;
const tiempoAuto = 15000; // Tiempo en milisegundos (15 segundos)

function moverCarrusel(n) {
    const carrusel = document.querySelector(".carrusel-images");
    const imagenes = document.querySelectorAll(".carrusel-img");

    indice += n;

    if (indice >= imagenes.length) {
        indice = 0;
    } else if (indice < 0) {
        indice = imagenes.length - 1;
    }

    // Mover el carrusel a la imagen actual
    carrusel.style.transform = `translateX(-${indice * 100}%)`;
}

// Función que avanza automáticamente cada 'tiempoAuto' segundos
function avanceAutomatico() {
    moverCarrusel(1); // Mover a la siguiente imagen
}

// Iniciar el carrusel automático
setInterval(avanceAutomatico, tiempoAuto);
