const sonidos = {
  click: new Audio('https://humanbenchmark.com/static/media/boop.5113a00f.mp3'),
  acierto: new Audio('https://humanbenchmark.com/static/media/victory.58c08d6a.mp3'),
  error: new Audio('https://humanbenchmark.com/static/media/go.60dd916f.mp3'),
};
let secuenciaUsuario = [];
let intentos = 0;

function mostrarCuadro(cuadro) {
  cuadro.classList.add(cuadro.dataset.color, 'volteado');
}

function ocultarCuadro(cuadro) {
  cuadro.classList.remove('volteado', cuadro.dataset.color);
}

function eliminarCuadro(cuadro) {
  cuadro.classList.add('encontrado');
}

function reproducirSonido(sonido) {
  sonido.currentTime = 0;
  sonido.play();
}

function actualizarIntentos(intentos) {
  document.querySelector('#intentos').textContent = 'Intentos realizados: ' + intentos;
}

function evaluarJuegoFinalizo() {
  const cantidadCuadros = document.querySelectorAll('.cuadro').length;
  const cantidadCuadrosEncontrados = document.querySelectorAll('.encontrado').length;

  if (cantidadCuadrosEncontrados === cantidadCuadros) {
    document.querySelector('#modal-ganar').classList.remove('escondido');
  }
}

function evaluarSecuenciaCorrecta(primerCuadro, segundoCuadro) {
  if (primerCuadro.dataset.color === segundoCuadro.dataset.color) {
    setTimeout(() => {
      eliminarCuadro(primerCuadro);
      eliminarCuadro(segundoCuadro);
      reproducirSonido(sonidos.acierto);
      evaluarJuegoFinalizo();
    }, 500);
  } else {
    setTimeout(() => {
      ocultarCuadro(primerCuadro);
      ocultarCuadro(segundoCuadro);
      reproducirSonido(sonidos.error);
    }, 500);
  }
}

function manejarInputUsuario(cuadroClickeado) {
  mostrarCuadro(cuadroClickeado);
  reproducirSonido(sonidos.click);
  secuenciaUsuario.push(cuadroClickeado);

  if (secuenciaUsuario.length == 2) {
    evaluarSecuenciaCorrecta(secuenciaUsuario[0], secuenciaUsuario[1]);
    secuenciaUsuario = [];
    intentos++;
    actualizarIntentos(intentos);
  }
}

function habilitarInputUsuario() {
  const tablero = document.querySelector('#tablero');
  tablero.onclick = (e) => {
    if (
      e.target.classList.contains('cuadro') &&
      !e.target.classList.contains('encontrado') &&
      !e.target.classList.contains('volteado')
    ) {
      manejarInputUsuario(e.target);
    }
  };
}

function asignarColoresACuadros() {
  const colores = ['azul', 'rojo', 'verde', 'amarillo', 'negro', 'naraja', 'rosa', 'gris'];
  const coloresRepetidos = colores.concat(colores);
  coloresRepetidos.sort(() => 0.5 - Math.random());
  const cuadros = document.querySelectorAll('.cuadro');
  coloresRepetidos.forEach((color, i) => {
    cuadros[i].dataset.color = color;
  });
}

function reiniciarEstadoCuadros() {
  const cuadros = document.querySelectorAll('.cuadro');
  cuadros.forEach((cuadro, i) => {
    cuadro.classList.remove('encontrado', 'volteado', cuadro.dataset.color);
  });
}

function reiniciarJuego() {
  reiniciarEstadoCuadros();
  asignarColoresACuadros();
  document.querySelector('#modal-ganar').classList.add('escondido');
  intentos = 0;
  actualizarIntentos(0);
}

function inicializar() {
  document.querySelector('#reiniciar-juego').onclick = reiniciarJuego;
  asignarColoresACuadros();
  habilitarInputUsuario();
}

inicializar();
