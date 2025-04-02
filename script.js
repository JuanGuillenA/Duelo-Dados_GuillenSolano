// Solano - Rivera
// Aqui creamos las variables que vamos a utilizar en el script
let nombreJugador1 = "";
let nombreJugador2 = "";
let colorDado1 = "#ffffff";
let colorDado2 = "#ffffff";

let puntaje1 = 0;
let puntaje2 = 0;
let ronda = 1;
const rondasTotales = 3;
let turnoActual = 1;

let historialJugador1 = [];
let historialJugador2 = [];

// ELEMENTOS DEL DOM – Capturamos elementos HTML para poder modificarlos desde JS
const inputNombre1 = document.getElementById("nombreJugador1");
const inputNombre2 = document.getElementById("nombreJugador2");
const inputColor1 = document.getElementById("colorDado1");
const inputColor2 = document.getElementById("colorDado2");

const nombre1Mostrar = document.getElementById("nombre1");
const nombre2Mostrar = document.getElementById("nombre2");
const parteJugador1 = document.getElementById("parteJugador1");
const parteJugador2 = document.getElementById("parteJugador2");

const puntaje1Span = document.getElementById("puntaje1");
const puntaje2Span = document.getElementById("puntaje2");

const rondaMostrar = document.getElementById("rondaMostrar");
const turnoMostrar = document.getElementById("turnoMostrar");
const mensajeFinal = document.getElementById("mensajeFinal");
const ganadorPartidaTexto = document.getElementById("ganadorPartida");

const historial1Div = document.getElementById("historial1");
const historial2Div = document.getElementById("historial2");

const dado1 = document.getElementById("dado1");
const dado2 = document.getElementById("dado2");
const audioDado = document.getElementById("audioDado");

const tablaResultadosBody = document.querySelector("#tablaResultados tbody");
const tablaHistorialBody = document.querySelector("#tablaHistorial tbody");

const btnIniciar = document.getElementById("btn-iniciar");
const btnRonda = document.getElementById("btn-ronda");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnHistorial = document.getElementById("btn-historial");

const configuracionSeccion = document.getElementById("configuracion");
const juegoSeccion = document.getElementById("juego");
const historialPartidasSection = document.getElementById("historialPartidas");

// OBJETO PARA DEFINIR LA ROTACIÓN DE CADA CARA DEL DADO EN 3D
const rotacionDado = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: -90, y: 0 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 },
};

// Convierte número (1-6) a su equivalente en texto
function numeroTexto(num) {
  return ["", "uno", "dos", "tres", "cuatro", "cinco", "seis"][num];
}

// Cambia el color de fondo de todas las caras del dado
function aplicarColorDado(dadoId, color) {
  document.querySelectorAll(`#${dadoId} .cara`).forEach(c => {
    c.style.backgroundColor = color;
  });
}

// Muestra la ronda actual y el nombre del jugador que tiene el turno
function actualizarPanelInfo() {
  rondaMostrar.textContent = ronda;
  turnoMostrar.textContent = turnoActual === 1 ? nombreJugador1 : nombreJugador2; 
}

// Actualiza el historial de resultados lanzados en la interfaz
function actualizarHistorial() {
  historial1Div.textContent = "Historial: " + historialJugador1.join(", ");
  historial2Div.textContent = "Historial: " + historialJugador2.join(", ");
}

// Función que lanza el dado con animación 3D y sonido
function lanzarDado(dado) {
  return new Promise(resolve => {
    const num = Math.floor(Math.random() * 6) + 1; // número aleatorio entre 1 y 6
    const { x, y } = rotacionDado[num];
    const extraX = Math.floor(Math.random() * 4) * 360; // para que el giro sea más dinámico
    const extraY = Math.floor(Math.random() * 4) * 360;
    const rotacion = `rotateX(${x + extraX}deg) rotateY(${y + extraY}deg)`;

    dado.querySelectorAll(".cara").forEach(c => c.classList.remove("cara-activa"));
    dado.style.transform = rotacion;
    const caraActiva = dado.querySelector(`.cara.${numeroTexto(num)}`);
    if (caraActiva) caraActiva.classList.add("cara-activa");

    audioDado.currentTime = 0;
    audioDado.play();

    setTimeout(() => resolve(num), 1000); // después de 1 segundo, devuelve el número obtenido
  });
}

// Guarda los datos de la partida en el localStorage
function guardarPartida(j1, p1, j2, p2, ganador) {
  const historial = JSON.parse(localStorage.getItem("historialPartidas") || "[]");
  historial.unshift({
    fecha: new Date().toLocaleString(),
    jugador1: j1,
    puntaje1: p1,
    jugador2: j2,
    puntaje2: p2,
    ganador
  });
  localStorage.setItem("historialPartidas", JSON.stringify(historial));
}

// Muestra u oculta el historial de partidas guardadas
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historialPartidas") || "[]");
  tablaHistorialBody.innerHTML = "";
  historial.forEach(p => {
    const fila = `<tr>
                    <td>${p.fecha}</td>
                    <td>${p.jugador1} (${p.puntaje1})</td>
                    <td>${p.jugador2} (${p.puntaje2})</td>
                    <td>${p.ganador}</td>
                  </tr>`;
    tablaHistorialBody.innerHTML += fila;
  });
  historialPartidasSection.style.display = 
    historialPartidasSection.style.display === "none" ? "block" : "none";
}

// Reinicia todas las variables y limpia la pantalla
function reiniciarJuego() {
  puntaje1 = puntaje2 = 0;
  ronda = 1;
  turnoActual = 1;
  historialJugador1 = [];
  historialJugador2 = [];

  puntaje1Span.textContent = "0";
  puntaje2Span.textContent = "0";
  mensajeFinal.textContent = "";
  ganadorPartidaTexto.style.display = "none";
  tablaResultadosBody.innerHTML = "";
  btnRonda.disabled = false;
  btnReiniciar.style.display = "none";
  actualizarPanelInfo();
  actualizarHistorial();
}

// EVENTOS

// Botón Iniciar Juego
btnIniciar.addEventListener("click", () => {
  // Si no escriben nombre, se usa valor por defecto
  nombreJugador1 = inputNombre1.value || "Jugador 1";
  nombreJugador2 = inputNombre2.value || "Jugador 2";
  colorDado1 = inputColor1.value;
  colorDado2 = inputColor2.value;

  // Mostrar nombres en pantalla
  nombre1Mostrar.textContent = nombreJugador1;
  nombre2Mostrar.textContent = nombreJugador2;
  parteJugador1.textContent = nombreJugador1;
  parteJugador2.textContent = nombreJugador2;

  // Aplicar colores seleccionados
  aplicarColorDado("dado1", colorDado1);
  aplicarColorDado("dado2", colorDado2);

  // Ocultar configuración, mostrar juego
  configuracionSeccion.style.display = "none";
  juegoSeccion.style.display = "block";
  actualizarPanelInfo();
});

// Botón Lanzar Dado (una ronda)
btnRonda.addEventListener("click", async () => {
  if (ronda > rondasTotales) return;

  const res1 = await lanzarDado(dado1);
  const res2 = await lanzarDado(dado2);

  puntaje1 += res1;
  puntaje2 += res2;
  historialJugador1.push(res1);
  historialJugador2.push(res2);
  actualizarHistorial();

  puntaje1Span.textContent = puntaje1;
  puntaje2Span.textContent = puntaje2;

  const ganadorRonda = 
    res1 > res2 ? nombreJugador1 : 
    res2 > res1 ? nombreJugador2 : 
    "Empate";
  
  tablaResultadosBody.innerHTML += 
    `<tr>
       <td>${ronda}</td>
       <td>${res1}</td>
       <td>${res2}</td>
       <td>${ganadorRonda}</td>
     </tr>`;

  if (ronda === rondasTotales) {
    let final = "Empate";
    if (puntaje1 > puntaje2) final = nombreJugador1;
    else if (puntaje2 > puntaje1) final = nombreJugador2;

    mensajeFinal.textContent = final === "Empate" ? "¡Empate!" : `${final} gana la partida!`;
    ganadorPartidaTexto.style.display = "block";
    ganadorPartidaTexto.textContent = `¡Ganador: ${final}!`;

    guardarPartida(nombreJugador1, puntaje1, nombreJugador2, puntaje2, final);

    btnRonda.disabled = true;
    btnReiniciar.style.display = "inline-block";
  } else {
    // Solo incrementa la ronda si aún no ha llegado a la última
    ronda++;
    turnoActual = turnoActual === 1 ? 2 : 1;
    actualizarPanelInfo();
  }
});

// Botón Reiniciar Partida
btnReiniciar.addEventListener("click", reiniciarJuego);

// Botón Ver Historial
btnHistorial.addEventListener("click", mostrarHistorial);

// Tecla Espacio para lanzar dado (en lugar de dar clic)
document.addEventListener("keydown", e => {
  if (
    e.code === "Space" && 
    !e.repeat && 
    !btnRonda.disabled && 
    juegoSeccion.style.display === "block"
  ) {
    btnRonda.click();
  }
});
