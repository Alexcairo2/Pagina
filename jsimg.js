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