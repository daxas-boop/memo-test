let secuenciaUsuario = [];

function evaluarSecuenciaCorrecta() {
  const primerCuadro = secuenciaUsuario[0];
  const segundoCuadro = secuenciaUsuario[1];
  if (primerCuadro.dataset.color === segundoCuadro.dataset.color) {
    setTimeout(() => {
      primerCuadro.classList.add('encontrado');
      segundoCuadro.classList.add('encontrado');
    }, 500);
  } else {
    setTimeout(() => {
      primerCuadro.classList.remove('volteado', primerCuadro.dataset.color);
      segundoCuadro.classList.remove('volteado', segundoCuadro.dataset.color);
    }, 500);
  }
}

function manejarInputUsuario(cuadroClickeado) {
  const color = cuadroClickeado.dataset.color;
  cuadroClickeado.classList.add(color, 'volteado');
  secuenciaUsuario.push(cuadroClickeado);

  if (secuenciaUsuario.length == 2) {
    evaluarSecuenciaCorrecta();
    secuenciaUsuario = [];
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

function inicializar() {
  asignarColoresACuadros();
  habilitarInputUsuario();
}

inicializar();
