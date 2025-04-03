// Creamos estas variables para utilizarlas dentro del juego

// Aqui colocamos las variables para los nombres de los jugadores
let nombreJugador1 = "";  
let nombreJugador2 = "";  

// Con estas variables guardamos los colores de los dados para utilizarlas
let colorDado1 = "#ffffff"; 
let colorDado2 = "#ffffff"; 

// Con estas variables almacenamos el puntaje de cada jugador de cada ronda
let puntaje1 = 0;  
let puntaje2 = 0;  

// Creamos estas variables para manejar todo lo que tiene que ver con las rondas del juego
let ronda = 1;          // Esta es la ronda del juego en la que se esta
const rondasTotales = 3;  // Son los numeros de rondas
let turnoActual = 1;    // Se dice de quien es el turno 1 si es el jugador 1 y 2 si es el jugador 2

// Colocamos arrays para guardar el historial de resultados
let historialJugador1 = [];  // Historial de lanzamientos del jugador 1
let historialJugador2 = [];  // Historial de lanzamientos del jugador 2

// Aqui van lo elementos del HTML para poder ocuparlos aca

// Estos son los inputs para que los jugadores elijan sus nombres y el color de sus dados
const inputNombre1 = document.getElementById("nombreJugador1"); // Input del jugador 1
const inputNombre2 = document.getElementById("nombreJugador2"); // Input del jugador 2
const inputColor1 = document.getElementById("colorDado1");        // Input del dado del jugador 1
const inputColor2 = document.getElementById("colorDado2");        // Input del dado del jugador 2

// Aqui con estos elementos podemos mostrar los nombres de los jugadores
const nombre1Mostrar = document.getElementById("nombre1");  // Este elemento es del jugador 1
const nombre2Mostrar = document.getElementById("nombre2");  // Este elemento es del jugador 2
// Estos elementos asignan las secciones que corresponde a cada jugador
const parteJugador1 = document.getElementById("parteJugador1"); // Para el jugador 1
const parteJugador2 = document.getElementById("parteJugador2"); // Para el jugador 2

// Con estos elementos muestro el puntaje de los jugadores
const puntaje1Span = document.getElementById("puntaje1"); // Se muestra el puntaje del jugador 1
const puntaje2Span = document.getElementById("puntaje2"); // Se muestra el puntaje del jugador 2

// Con estos elementos se muestran la ronda y turno en el que estan
const rondaMostrar = document.getElementById("rondaMostrar");  //Es la ronda actual
const turnoMostrar = document.getElementById("turnoMostrar");  // Aqui muetsra el nombre del jugador que esta en el turno

// Con estos elementos mostramos el marcador final y el ganador de la partida
const mensajeFinal = document.getElementById("mensajeFinal");        
const ganadorPartidaTexto = document.getElementById("ganadorPartida"); 

// Con estos elementos mostramos el historial que tiene cada jugador 
const historial1Div = document.getElementById("historial1"); 
const historial2Div = document.getElementById("historial2"); 

// Con estos elementos son para los dados de los dos jugadores y el sonido del dado
const dado1 = document.getElementById("dado1");   
const dado2 = document.getElementById("dado2");   
const audioDado = document.getElementById("audioDado"); 

// Con estos elementos mostramos en tablas el historial y resultado de las partidas
const tablaResultadosBody = document.querySelector("#tablaResultados tbody"); 
const tablaHistorialBody = document.querySelector("#tablaHistorial tbody");       

// Estos son los botones que ocupamos en el juego
const btnIniciar = document.getElementById("btn-iniciar");     // Con este iniciamos el juego
const btnRonda = document.getElementById("btn-ronda");         // Con este boton lanzamos los dados 
const btnReiniciar = document.getElementById("btn-reiniciar"); // Con este boton reiniciamos la partida
const btnHistorial = document.getElementById("btn-historial"); // Con este boton mostramos y ocultamos el historial 

// Estas son las secciones del juego que estan en el HTML
const configuracionSeccion = document.getElementById("configuracion");   
const juegoSeccion = document.getElementById("juego");                   
const historialPartidasSection = document.getElementById("historialPartidas"); 

// Aqui colocamos la rotacion del dado en 3D
// Aqui asociamos un numero del 1-6 para hacer como si girara el dado 
const rotacionDado = {
  1: { x: 0, y: 0 },      
  2: { x: 0, y: -90 },    
  3: { x: -90, y: 0 },    
  4: { x: 0, y: 90 },     
  5: { x: 90, y: 0 },     
  6: { x: 0, y: 180 },    
};

// Aqui colocmaos esta funcion que transforma el numero que sale del dado en lo que equivale en letras
// Lo hacemos asi para saber que numero del dado es pero en funcion a su equivalente de las letras 
// para activar el dado
function numeroTexto(num) {
  // Este array tiene la palabra segun el numero que puede tocar
  return ["", "uno", "dos", "tres", "cuatro", "cinco", "seis"][num];
}

// Cambiamos el color del dado 
// Colocamos el dadoId que es el identificador para saber que dado es 1 o 2
// El color que colocamos en la cara del dado
function aplicarColorDado(dadoId, color) {
  // Selecciona todas las caras del dado usando un selector de plantilla para incluir el id y la clase .cara
  // Aqui colocamos un selector de plantilla que busca segun el dadoId el valor del dado que aparecio 
  // y busca todos los elementos de la clase dado en cual esta el que aparecio cunado giro el dado
  document.querySelectorAll(`#${dadoId} .cara`).forEach(c => {
    c.style.backgroundColor = color; //Aqui asignamos el color del dado que se eligio
  });
}


// Con esta funcion actualizamos el panel donde esta la informacion de la ronda y el turno actual
function actualizarPanelInfo() {
  rondaMostrar.textContent = ronda;  // Actualizamos el numeor de ronda mostrado 
  // Aqui mostramos el nombre de los jugadores con numeor si es 1 o 2
  turnoMostrar.textContent = turnoActual === 1 ? nombreJugador1 : nombreJugador2;
}

// Función que actualiza el historial de resultados en la interfaz, mostrando los lanzamientos realizados por cada jugador
function actualizarHistorial() {
  // Concatena los números almacenados en el historial de cada jugador y los muestra en el elemento correspondiente
  historial1Div.textContent = "Historial: " + historialJugador1.join(", ");
  historial2Div.textContent = "Historial: " + historialJugador2.join(", ");
}

// Con esta funcion realizamos el giro en 3D del dado y colocamos el sonido tambien
// Hacemos que reciba el parametro que esta en HTML del dado y que devuleva el numeor de la cara obetenido 
function lanzarDado(dado) {
  return new Promise(resolve => {
    // Para que gire el dado generamos un numero aleatorio del 1 - 6
    const num = Math.floor(Math.random() * 6) + 1;
    // Obtiene la rotacion del dado en base al numero de la cara que sale 'rotacionDado'
    const { x, y } = rotacionDado[num];
    // Aqui unicamente es visual porque agregamos rmas rotaciones que no interfiere en la cara que va aparecer
    // en el dado si no que es solo para que parezca que gira mas el dado
    const extraX = Math.floor(Math.random() * 4) * 360;
    const extraY = Math.floor(Math.random() * 4) * 360;
    const rotacion = `rotateX(${x + extraX}deg) rotateY(${y + extraY}deg)`;

    // Reinciamos el proceso del giro del dado haciendo que 
    dado.querySelectorAll(".cara").forEach(c => c.classList.remove("cara-activa"));
    // Aplicamos una transformacion al dado para que siga simulando el giro en 3D
    dado.style.transform = rotacion;
    // Aqui con la cara que cayo el dado la seleccionamos para colocar su respectivo numero pero en letras
    const cara = dado.querySelector(`.cara.${numeroTexto(num)}`);
    if (cara) cara.classList.add("cara-activa"); // Activamos la clase para que se resalte de verde como colocamos en el CSS

    // Aqui hacemos que suene el dado
    audioDado.currentTime = 0;
    audioDado.play();
    // Hacemos que espere 1 segundo para que luego de la respuesta el dado con el numeor que va a sumar al puntaje y
    // al historial
    setTimeout(() => resolve(num), 1000);
  });
}

// Con esta funcion guardamos el hsitorial de partidas en el local storage
// Parámetros: j1 nombre del jugador 1, p1 puntaje final del jugador 1, j2 nombre del jugador 2
// p2 puntaje final del jugador 2, ganador nombre del jugador ganador o si empatan
function guardarPartida(j1, p1, j2, p2, ganador) {
  // Aca recuperamos el hisotrial de partidas jugadas y si no hya ponemos el array vacio
  const historial = JSON.parse(localStorage.getItem("historialPartidas") || "[]");
  // Ponemos la partida jugada actualmente al principo del array
  historial.unshift({
    fecha: new Date().toLocaleString(),  
    jugador1: j1,
    puntaje1: p1,
    jugador2: j2,
    puntaje2: p2,
    ganador
  });
  // Guarda el array actualizado en el localStorage como una cadena
  localStorage.setItem("historialPartidas", JSON.stringify(historial));
}

// Esta funcion es para el momento de darle al boton de ver historial se muestre o se oculte
// Para eso hacemos que lea el localstorage y cree las filas de la tabla 
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historialPartidas") || "[]");
  tablaHistorialBody.innerHTML = "";
  // Hacemos que para cada partida cree una fila "tr" con celdas y "td" con la información
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

// Con esta funcion reinciamos el juego osea todas las variables de nuevo al inciio para hacer de nuevo
// y limpiamos los elementos de la interfaz puntajes, historial, mensajes
function reiniciarJuego() {
  puntaje1 = puntaje2 = 0;  // Reinciamos ambos puntajes a 0
  ronda = 1;                // Las rondas devolemos a 1
  turnoActual = 1;          // Ponemos que el turno vuelva a empezar con el jugador 1
  historialJugador1 = [];   // Limpia el historial del jugador 1
  historialJugador2 = [];   // Limpia el historial del jugador 2

  puntaje1Span.textContent = "0";
  puntaje2Span.textContent = "0";
  mensajeFinal.textContent = "";
  ganadorPartidaTexto.style.display = "none";
  tablaResultadosBody.innerHTML = "";
  btnRonda.disabled = false;
  btnReiniciar.style.display = "none";
  actualizarPanelInfo();  // Actualiza el panel con la ronda y turno inicial
  actualizarHistorial();  // Actualiza el historial mostrado en pantalla (vacío)
}


// Evento de Botón Iniciar Juego
// Cuando nosotros hacemos clic en el botón "Iniciar Juego", se recogen los nombres y colores que ingresamos
// y se actualiza la interfaz para pasar de la configuración al juego.
btnIniciar.addEventListener("click", () => {
  //  Aqui asignamos los nombres ingresados por nosotros o usamos valores por defecto si dejamos los campos vacíos.
  nombreJugador1 = inputNombre1.value || "Jugador 1";
  nombreJugador2 = inputNombre2.value || "Jugador 2";
  // Asignamos los colores que elegimos para cada dado.
  colorDado1 = inputColor1.value;
  colorDado2 = inputColor2.value;

  // Mostramos en pantalla los nombres que ingresamos.
  nombre1Mostrar.textContent = nombreJugador1;
  nombre2Mostrar.textContent = nombreJugador2;
  parteJugador1.textContent = nombreJugador1;
  parteJugador2.textContent = nombreJugador2;

  // Aplicamos los colores a los dados usando la función que creamos para eso.
  aplicarColorDado("dado1", colorDado1);
  aplicarColorDado("dado2", colorDado2);

  // Ocultamos la sección de configuración y mostramos la sección del juego.
  configuracionSeccion.style.display = "none";
  juegoSeccion.style.display = "block";

  // Actualizamos el panel informativo para que se muestre la ronda y el turno inicial.
  actualizarPanelInfo();
});

// Evento de  Botón Lanzar Dado 
// Al hacer clic, nosotros lanzamos los dados para cada jugador, actualizamos puntajes, historial y mostramos el resultado.
btnRonda.addEventListener("click", async () => {
  // Si ya superamos el número total de rondas, no hacemos nada.
  if (ronda > rondasTotales) return;

  // Lanzamos los dados de cada jugador y esperamos el resultado.
  const res1 = await lanzarDado(dado1);  // Obtenemos el número del dado para el jugador 1
  const res2 = await lanzarDado(dado2);  // Obtenemos el número del dado para el jugador 2

  // Sumamos los resultados a nuestros puntajes acumulados.
  puntaje1 += res1;
  puntaje2 += res2;

  // Añadimos el resultado de esta ronda a nuestro historial de lanzamientos.
  historialJugador1.push(res1);
  historialJugador2.push(res2);

  // Actualizamos el historial en la interfaz para que se vea lo que hemos lanzado.
  actualizarHistorial();

  // Mostramos los puntajes actualizados en los elementos de la pantalla.
  puntaje1Span.textContent = puntaje1;
  puntaje2Span.textContent = puntaje2;

  // Determinamos quién ganó esta ronda: si el resultado del jugador 1 es mayor, gana él;
  // si es mayor el del jugador 2, gana él; si son iguales, es un empate.
  let ganadorRonda = res1 > res2 ? nombreJugador1 : res2 > res1 ? nombreJugador2 : "Empate";

  // Insertamos una nueva fila en la tabla de resultados con el número de ronda, los resultados y el ganador.
  tablaResultadosBody.innerHTML += `<tr>
       <td>${ronda}</td>
       <td>${res1}</td>
       <td>${res2}</td>
       <td>${ganadorRonda}</td>
     </tr>`;

  // Si estamos en la última ronda, determinamos el ganador final y mostramos el mensaje correspondiente.
  if (ronda === rondasTotales) {
    let final = "Empate";
    if (puntaje1 > puntaje2) final = nombreJugador1;
    else if (puntaje2 > puntaje1) final = nombreJugador2;

    // Mostramos el mensaje final indicando si hubo empate o quién ganó la partida.
    mensajeFinal.textContent = final === "Empate" ? "¡Empate!" : `${final} gana la partida!`;
    ganadorPartidaTexto.style.display = "block";
    ganadorPartidaTexto.textContent = `¡Ganador: ${final}!`;

    // Guardamos la partida en el localStorage para tener un historial de lo jugado.
    guardarPartida(nombreJugador1, puntaje1, nombreJugador2, puntaje2, final);
    // Deshabilitamos el botón de lanzar dado para que ya no se puedan hacer más rondas.
    btnRonda.disabled = true;
    // Mostramos el botón para reiniciar la partida.
    btnReiniciar.style.display = "inline-block";
  } else {
    // Si aún no es la última ronda, incrementamos el número de ronda y cambiamos el turno al otro jugador.
    ronda++;
    turnoActual = turnoActual === 1 ? 2 : 1;
    // Actualizamos el panel informativo con la nueva ronda y el turno actualizado.
    actualizarPanelInfo();
  }
});

// EVENTO: Botón "Reiniciar Partida"
// Cuando hacemos clic en este botón, nosotros llamamos a la función que reinicia el juego,
// restableciendo todas las variables y limpiando la interfaz para comenzar de nuevo.
btnReiniciar.addEventListener("click", reiniciarJuego);

// EVENTO: Botón "Ver Historial"
// Al pulsar este botón, nosotros alternamos la visualización del historial de partidas guardadas.
btnHistorial.addEventListener("click", mostrarHistorial);

// EVENTO: Presionar la tecla "Espacio" para lanzar el dado
// Esto nos permite usar la barra espaciadora en lugar de hacer clic en el botón "Lanzar Dado".
document.addEventListener("keydown", e => {
  if (
    e.code === "Space" &&   // Verificamos que la tecla presionada sea la barra espaciadora
    !e.repeat &&            // Nos aseguramos de que no se ejecute repetidamente si mantenemos presionada la tecla
    !btnRonda.disabled &&   // Comprobamos que el botón de lanzar dado esté habilitado
    juegoSeccion.style.display === "block"  // Confirmamos que la sección del juego se encuentre visible
  ) {
    btnRonda.click();  // Simulamos un clic en el botón "Lanzar Dado" para iniciar la acción
  }
});