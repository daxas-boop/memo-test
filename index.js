let secuenciaUsuario = [];

function manejarInputUsuario(cuadroClickeado) {
  const color = cuadroClickeado.dataset.color;
  cuadroClickeado.classList.add(color, 'volteado');
  secuenciaUsuario.push(cuadroClickeado);

  if (secuenciaUsuario.length == 2) {
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
