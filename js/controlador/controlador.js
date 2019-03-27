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

  editarPregunta: function(data, id){
    this.modelo.editarPregunta(data , id);
  },

  obtenerPregunta: function(id) {
    return this.modelo.obtenerPregunta(id)
  },

  agregarVoto: function(nombrePregunta, respuestaSeleccionada, id) {
    this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada, id);
  },


};
