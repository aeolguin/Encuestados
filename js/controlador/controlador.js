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
    this.modelo.quitarPregunta(id);
  },

  borrarTodo: function(){
    this.modelo.borrarTodo();
  },

  editarPregunta: function(){
    this.modelo.editarPregunta();
  }


};
