document.addEventListener("DOMContentLoaded", () => {
// Variables para la configuración del juego (nombres y colores)
let nombreJugador1 = "";
let nombreJugador2 = "";
let colorDado1 = "#ffffff";
let colorDado2 = "#ffffff";

// Variables para el estado del juego (puntajes, ronda, turnos)
let puntaje1 = 0;
let puntaje2 = 0;
let ronda = 1;
const rondasTotales = 3;
let turnoActual = 1;  // 1 representa al Jugador 1, 2 al Jugador 2

// Arreglos para guardar el historial de lanzamientos de cada jugador
let historialJugador1 = [];
let historialJugador2 = [];

// Referencias a elementos de la sección de configuración
const btnIniciar = document.getElementById("btn-iniciar");
const inputNombre1 = document.getElementById("nombreJugador1");
const inputNombre2 = document.getElementById("nombreJugador2");
const inputColor1 = document.getElementById("colorDado1");
const inputColor2 = document.getElementById("colorDado2");

// Referencias a elementos de la sección del juego
const configuracionSeccion = document.getElementById("configuracion");
const juegoSeccion = document.getElementById("juego");
const nombre1Mostrar = document.getElementById("nombre1");
const nombre2Mostrar = document.getElementById("nombre2");
const parteJugador1 = document.getElementById("parteJugador1");
const parteJugador2 = document.getElementById("parteJugador2");
const puntaje1Span = document.getElementById("puntaje1");
const puntaje2Span = document.getElementById("puntaje2");
const btnRonda = document.getElementById("btn-ronda");
const btnReiniciar = document.getElementById("btn-reiniciar");
const tablaResultadosBody = document.querySelector("#tablaResultados tbody");
const mensajeFinal = document.getElementById("mensajeFinal");

// Referencias al panel de información (ronda, turno y mejores puntuaciones)
const rondaMostrar = document.getElementById("rondaMostrar");
const turnoMostrar = document.getElementById("turnoMostrar");
const mejoresPuntuaciones = document.getElementById("mejoresPuntuaciones");

// Referencias a los dados 3D de cada jugador (los elementos con id "dado1" y "dado2")
const dado1 = document.getElementById("dado1");
const dado2 = document.getElementById("dado2");

// Referencias a los elementos donde se mostrará el historial de lanzamientos
const historial1Div = document.getElementById("historial1");
const historial2Div = document.getElementById("historial2");

// Elemento de audio para reproducir sonido al lanzar el dado
const audioDado = document.getElementById("audioDado");

// Objeto que asigna a cada número la rotación necesaria para mostrar la cara correcta en el dado
const rotacionDado = {
  1: { x: 0,   y: 0 },
  2: { x: 0,   y: -90 },
  3: { x: 90,  y: 0 },
  4: { x: -90, y: 0 },
  5: { x: 0,   y: 90 },
  6: { x: 0,   y: 180 }
};

/* Función que aplica el color seleccionado a todas las caras de un dado específico.
   Recibe el id del dado (por ejemplo, "dado1" o "dado2") y el color a aplicar.
   Se usa la clase ".cara" (utilizada en el HTML versión 2). */
function aplicarColorDado(dadoId, color) {
  document.querySelectorAll(`#${dadoId} .cara`).forEach(cara => {
    cara.style.backgroundColor = color;
  });
}

/* Función que simula el lanzamiento de un dado 3D.
   Reproduce sonido, aplica transformaciones para animar y retorna el número obtenido mediante una Promesa. */
function rollDice(diceElement) {
  return new Promise(resolve => {
    // Genera un número aleatorio entre 1 y 6
    const resultado = Math.floor(Math.random() * 6) + 1;
    // Obtiene la rotación final correspondiente al resultado
    const targetRotation = rotacionDado[resultado];
    // Genera giros completos aleatorios para un efecto visual extra
    const randomX = (Math.floor(Math.random() * 4) + 1) * 360;
    const randomY = (Math.floor(Math.random() * 4) + 1) * 360;
    // Combina la rotación aleatoria con la rotación objetivo para formar la transformación final
    const finalRotation = `rotateX(${randomX + targetRotation.x}deg) rotateY(${randomY + targetRotation.y}deg)`;
    // Reproduce el efecto de sonido
    audioDado.currentTime = 0;
    audioDado.play();
    // Aplica la transformación al dado (con animación gracias a la transición en CSS)
    diceElement.style.transform = finalRotation;
    // Agrega la clase que aplica el efecto de sacudida
    diceElement.classList.add("sacudir");
    // Espera 1 segundo para que termine la animación, luego remueve el efecto y resuelve la promesa con el resultado
    setTimeout(() => {
      diceElement.classList.remove("sacudir");
      resolve(resultado);
    }, 1000);
  });
}

/* Función para actualizar el panel de información con la ronda actual, el turno y las mejores puntuaciones almacenadas */
function actualizarPanelInfo() {
  rondaMostrar.textContent = ronda;
  turnoMostrar.textContent = turnoActual === 1 ? nombreJugador1 : nombreJugador2;
  const record1 = localStorage.getItem("recordJugador1") || 0;
  const record2 = localStorage.getItem("recordJugador2") || 0;
  mejoresPuntuaciones.innerHTML = `
    <p>Mejor puntuación de ${nombreJugador1}: ${record1}</p>
    <p>Mejor puntuación de ${nombreJugador2}: ${record2}</p>
  `;
}

/* Función para actualizar el historial visual de lanzamientos */
function actualizarHistorial() {
  historial1Div.textContent = "Historial: " + historialJugador1.join(", ");
  historial2Div.textContent = "Historial: " + historialJugador2.join(", ");
}

/* Función para reiniciar el juego y restablecer variables e interfaz */
function reiniciarJuego() {
  puntaje1 = 0;
  puntaje2 = 0;
  ronda = 1;
  turnoActual = 1;
  historialJugador1 = [];
  historialJugador2 = [];
  puntaje1Span.textContent = puntaje1;
  puntaje2Span.textContent = puntaje2;
  actualizarPanelInfo();
  mensajeFinal.textContent = "";
  tablaResultadosBody.innerHTML = "";
  actualizarHistorial();
  btnRonda.disabled = false;
  btnReiniciar.style.display = "none";
}

/* Evento para iniciar el juego cuando el usuario presiona el botón "Iniciar Juego" */
btnIniciar.addEventListener("click", () => {
  nombreJugador1 = inputNombre1.value || "Jugador 1";
  nombreJugador2 = inputNombre2.value || "Jugador 2";
  // Se obtienen los colores de cada dado
  colorDado1 = inputColor1.value;
  colorDado2 = inputColor2.value;
  
  // Actualiza los elementos que muestran los nombres en la sección del juego
  nombre1Mostrar.textContent = nombreJugador1;
  nombre2Mostrar.textContent = nombreJugador2;
  parteJugador1.textContent = nombreJugador1;
  parteJugador2.textContent = nombreJugador2;
  
  // Aplica el color a las caras de cada dado individualmente
  aplicarColorDado("dado1", colorDado1);
  aplicarColorDado("dado2", colorDado2);
  
  actualizarPanelInfo();
  configuracionSeccion.style.display = "none";
  juegoSeccion.style.display = "block";
});

/* Evento para comenzar una ronda al pulsar el botón "Lanzar Dado" */
btnRonda.addEventListener("click", async () => {
  if (ronda > rondasTotales) return;
  
  // Lanza ambos dados simultáneamente y espera los resultados usando Promise.all
  const [resultado1, resultado2] = await Promise.all([
    rollDice(dado1),
    rollDice(dado2)
  ]);
  
  puntaje1 += resultado1;
  puntaje2 += resultado2;
  puntaje1Span.textContent = puntaje1;
  puntaje2Span.textContent = puntaje2;
  
  historialJugador1.push(resultado1);
  historialJugador2.push(resultado2);
  actualizarHistorial();
  
  let ganadorRonda = "";
  if (resultado1 > resultado2) {
    ganadorRonda = nombreJugador1;
  } else if (resultado2 > resultado1) {
    ganadorRonda = nombreJugador2;
  } else {
    ganadorRonda = "Empate";
  }
  
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${ronda}</td>
    <td>${resultado1}</td>
    <td>${resultado2}</td>
    <td>${ganadorRonda}</td>
  `;
  tablaResultadosBody.appendChild(fila);
  
  turnoActual = turnoActual === 1 ? 2 : 1;
  actualizarPanelInfo();
  
  if (ronda === rondasTotales) {
    let mensaje = "";
    if (puntaje1 > puntaje2) {
      mensaje = `${nombreJugador1} gana el juego!`;
      const record1 = parseInt(localStorage.getItem("recordJugador1") || "0");
      if (puntaje1 > record1) {
        localStorage.setItem("recordJugador1", puntaje1);
      }
    } else if (puntaje2 > puntaje1) {
      mensaje = `${nombreJugador2} gana el juego!`;
      const record2 = parseInt(localStorage.getItem("recordJugador2") || "0");
      if (puntaje2 > record2) {
        localStorage.setItem("recordJugador2", puntaje2);
      }
    } else {
      mensaje = "El juego termina en empate!";
    }
    mensajeFinal.textContent = mensaje;
    actualizarPanelInfo();
    btnRonda.disabled = true;
    btnReiniciar.style.display = "inline-block";
  }
  
  ronda++;
});

/* Evento para reiniciar el juego al pulsar el botón "Reiniciar Partida" */
btnReiniciar.addEventListener("click", () => {
  reiniciarJuego();
});

/* Permite lanzar el dado usando la tecla "espacio".
   Si se presiona la barra espaciadora, simula un clic en el botón "Lanzar Dado". */
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !btnRonda.disabled && juegoSeccion.style.display === "block") {
    btnRonda.click();
  }
});
});