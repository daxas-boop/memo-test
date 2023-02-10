/// <reference types="cypress" />;

describe('Memotest', () => {
  const URL = 'http://127.0.0.1:5500';
  it('La pagina carga correctamente', () => {
    cy.visit(URL);
  });

  beforeEach(() => {
    cy.visit(URL);
  });

  describe('Los componentes se cargan correctamente', () => {
    it('Los cuadros cargan correctamente', () => {
      const colores = ['azul', 'rojo', 'verde', 'amarillo', 'negro', 'naraja', 'rosa', 'gris'];
      colores.forEach((color) => {
        cy.get(`[data-color=${color}]`).should('have.length', 2);
      });
    });

    it('Los colores de los cuadros son aleatorios', () => {
      const coloresOriginales = [];
      const coloresNuevos = [];
      cy.get('.cuadro').then((cuadros) => {
        cuadros.each((i, cuadro) => {
          coloresOriginales.push(cuadro.dataset.color);
        });

        cy.visit(URL);

        cy.get('.cuadro').then((cuadros) => {
          cuadros.each((i, cuadro) => {
            coloresNuevos.push(cuadro.dataset.color);
          });
          expect(coloresOriginales).to.not.deep.equal(coloresNuevos);
        });
      });
    });

    it('El titulo carga correctamente', () => {
      cy.get('h1:first').should('have.text', 'Memotest');
    });

    it('El boton reiniciar carga correctamente', () => {
      cy.get('#reiniciar-juego').should('have.text', 'Reiniciar');
    });
  });

  describe('El juego funciona correctamente', () => {
    it('Al hacer click a un cuadro se le agrega el efecto de volteado', () => {
      cy.get('.cuadro:first').should('not.have.class', 'volteado');
      cy.get('.cuadro:first').click();
      cy.get('.cuadro:first').should('have.class', 'volteado');
    });

    it('Al hacer click a un cuadro se le agrega el color', () => {
      cy.get('[data-color=azul]:first').should('not.have.class', 'azul');
      cy.get('[data-color=azul]:first').click();
      cy.get('[data-color=azul]:first').should('have.class', 'azul');
    });

    it('Al elegir una secuencia equivocada ambos cuadros pierden el color', () => {
      cy.get('[data-color=azul]:first').click();
      cy.get('[data-color=azul]:first').should('have.class', 'azul');
      cy.get('[data-color=verde]:first').click();
      cy.get('[data-color=verde]:first').should('have.class', 'verde');
      cy.wait(500);
      cy.get('[data-color=azul]:first').should('not.have.class', 'azul');
      cy.get('[data-color=verde]:first').should('not.have.class', 'verde');
    });

    it('Al elegir una secuencia correcta ambos cuadros son ocultados', () => {
      cy.get('[data-color=verde]').eq(0).click();
      cy.get('[data-color=verde]').eq(0).should('not.have.class', 'encontrado');
      cy.get('[data-color=verde]').eq(1).click();
      cy.get('[data-color=verde]').eq(1).should('not.have.class', 'encontrado');
      cy.wait(500);
      cy.get('[data-color=verde]').eq(0).should('have.class', 'encontrado');
      cy.get('[data-color=verde]').eq(1).should('have.class', 'encontrado');
    });

    it('Al finalizar el juego se muestra el mensaje de ganar', () => {
      cy.get('#modal-ganar').should('have.class', 'escondido');
      const colores = ['azul', 'rojo', 'verde', 'amarillo', 'negro', 'naraja', 'rosa', 'gris'];
      colores.forEach((color) => {
        cy.get(`[data-color=${color}]`).eq(0).click();
        cy.get(`[data-color=${color}]`).eq(1).click();
      });
      cy.get('#modal-ganar').should('not.have.class', 'escondido');
    });

    it('Los colores de los cuadros se resetean despues de clickear Reiniciar', () => {
      const coloresOriginales = [];
      const coloresNuevos = [];
      cy.get('.cuadro').then((cuadros) => {
        cuadros.each((i, cuadro) => {
          coloresOriginales.push(cuadro.dataset.color);
        });

        cy.get('#reiniciar-juego').click();

        cy.get('.cuadro').then((cuadros) => {
          cuadros.each((i, cuadro) => {
            coloresNuevos.push(cuadro.dataset.color);
          });
          expect(coloresOriginales).to.not.deep.equal(coloresNuevos);
        });
      });
    });

    it('Los intentos se actualizan correctamente', () => {
      cy.get('#intentos').should('have.text', 'Intentos realizados: 0');
      cy.get('[data-color=verde]').eq(0).click();
      cy.get('[data-color=verde]').eq(1).click();
      cy.get('#intentos').should('have.text', 'Intentos realizados: 1');
    });
  });
});
