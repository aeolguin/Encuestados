/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  quitarPregunta: function(id){
    console.log("llego al controlador");
    this.modelo.quitarPregunta(id);
  },
};
