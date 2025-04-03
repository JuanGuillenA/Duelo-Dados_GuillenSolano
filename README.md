# Duelo de Dados

## Descripción del Proyecto
"Duelo de Dados" es un juego interactivo para dos jugadores en el que cada uno configura su nombre y el color de su dado.  
El juego se desarrolla en 3 rondas, en las que ambos jugadores lanzan dados (con animación 3D y sonido) para sumar puntos.  
Al final de las rondas, se muestra el ganador y se guarda el historial de partidas en el navegador.

## Instrucciones para Jugar
1. **Abrir el Proyecto:**  
   Abre el archivo `index.html` en tu navegador (puedes usar un servidor local para mayor comodidad).

2. **Configurar el Juego:**  
   - Ingresa el nombre de cada jugador en los campos correspondientes.  
   - Selecciona el color que desees para cada dado.
   - Revisa las reglas listadas:
     - Ingresa tu nombre y elige el color del dado.
     - Presiona **“Lanzar Dado”** o la barra espaciadora para cada ronda.
     - Se juegan **3 rondas** y se suman los puntajes.
     - Gana quien obtenga el mayor puntaje al final.

3. **Iniciar la Partida:**  
   Haz clic en el botón **Iniciar Juego** para comenzar.

4. **Durante la Partida:**  
   - Presiona el botón **Lanzar Dado** (o usa la barra espaciadora) para realizar cada lanzamiento.
   - Observa cómo se actualizan los puntajes y se guarda el historial de resultados.

5. **Final de la Partida:**  
   - Al terminar la última ronda, se mostrará el ganador.
   - Podrás ver el historial de partidas jugadas haciendo clic en **Ver Historial**.

## Capturas de Pantalla

_Aquí puedes agregar tus capturas de pantalla. Reemplaza las rutas por las de tus imágenes:_

- **Pantalla de Configuración:**
  <img width="922" alt="pantalla-configuracion" src="https://github.com/user-attachments/assets/a98b5cf8-6a6b-460b-9ec8-0ff450c0d034" />

- **Pantalla del Juego en Acción:**
   <img width="922" alt="pantalla-juego" src="https://github.com/user-attachments/assets/17f8d7ff-0027-4c59-9764-37f9ed528205" />

- **Historial de Partidas:**
  <img width="922" alt="pantalla-historial" src="https://github.com/user-attachments/assets/cb55f41a-6126-4c9d-abfc-6dda7a229176" />
  
## Tecnologías Utilizadas
- **HTML5:** Estructura y semántica de la aplicación.
- **CSS3:** Estilos, diseño responsivo y animaciones (incluyendo efectos 3D para los dados).
- **JavaScript:** Lógica del juego, manipulación del DOM y manejo de eventos.
- **LocalStorage:** Para guardar el historial de partidas en el navegador.

## Estructura del Proyecto
El proyecto está compuesto por los siguientes archivos:

- `index.html`  
  Contiene la estructura principal del juego, con secciones para la configuración, el juego en sí y el historial de partidas.

- `style.css`  
  Define los estilos, fuentes, colores y animaciones (incluyendo la rotación 3D de los dados).

- `script.js`  
  Implementa la lógica del juego, incluyendo:
  - Configuración de jugadores y colores.
  - Simulación del lanzamiento de dados con animación y sonido.
  - Control de rondas, actualización de puntajes y manejo del historial.
  - Interacción mediante botones y la tecla "Espacio".

- `dado-audio.mp3`  
  Archivo de audio que se reproduce al lanzar los dados.

## Autoría y Créditos
Este proyecto fue desarrollado en equipo por **Juan Alberto Guillen** y **Ariel David Solano**.  
Si tienes sugerencias o comentarios, no dudes en contactarnos.

## Licencia
Este proyecto se distribuye bajo la Licencia MIT.
