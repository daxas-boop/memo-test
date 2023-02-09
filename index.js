const sonidos = {
  click: new Audio('https://humanbenchmark.com/static/media/boop.5113a00f.mp3'),
  acierto: new Audio('https://humanbenchmark.com/static/media/victory.58c08d6a.mp3'),
  error: new Audio('https://humanbenchmark.com/static/media/go.60dd916f.mp3'),
};
let secuenciaUsuario = [];
let intentos = 0;

function evaluarJuegoFinalizo() {
  const cantidadCuadros = document.querySelectorAll('.cuadro').length;
  const cantidadCuadrosEncontrados = document.querySelectorAll('.encontrado').length;

  if (cantidadCuadrosEncontrados === cantidadCuadros) {
    document.querySelector('#modal-ganar').classList.remove('escondido');
  }
}

function evaluarSecuenciaCorrecta() {
  const primerCuadro = secuenciaUsuario[0];
  const segundoCuadro = secuenciaUsuario[1];
  if (primerCuadro.dataset.color === segundoCuadro.dataset.color) {
    setTimeout(() => {
      primerCuadro.classList.add('encontrado');
      segundoCuadro.classList.add('encontrado');
      sonidos.acierto.currentTime = 0;
      sonidos.acierto.play();
      evaluarJuegoFinalizo();
    }, 500);
  } else {
    setTimeout(() => {
      primerCuadro.classList.remove('volteado', primerCuadro.dataset.color);
      segundoCuadro.classList.remove('volteado', segundoCuadro.dataset.color);
      sonidos.error.currentTime = 0;
      sonidos.error.play();
    }, 500);
  }
}

function actualizarIntentos(intentos) {
  document.querySelector('#intentos').textContent = 'Intentos realizados: ' + intentos;
}

function manejarInputUsuario(cuadroClickeado) {
  const color = cuadroClickeado.dataset.color;
  cuadroClickeado.classList.add(color, 'volteado');
  sonidos.click.currentTime = 0;
  sonidos.click.play();
  secuenciaUsuario.push(cuadroClickeado);

  if (secuenciaUsuario.length == 2) {
    evaluarSecuenciaCorrecta();
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
