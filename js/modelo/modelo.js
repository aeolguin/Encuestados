/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = JSON.parse(localStorage.getItem("preguntas")) || [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.limpiarPreguntas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var data = this.preguntas.length;
    if (data === 0){
      return -1
    } else {
      for (var i=0;i<this.preguntas.length;++i){
        data = this.preguntas[i].id;
       }
      return data
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //Se quita una pregunta dado el id de la misma
  quitarPregunta: function(id) {
    this.preguntas.splice(id,1);
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  //Se suma 1 al voto de una respuesta
  agregarVoto: function(pregunta, respuesta, id) {
    for (var i=0;i<this.preguntas.length;i++){
      for (var j=0;j<this.preguntas[i].cantidadPorRespuesta.length;j++){
      if (this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta === respuesta) {
        this.preguntas[i].cantidadPorRespuesta[j].cantidad++;
        break;
        }
      }
    };
    this.guardar();
    this.votoAgregado.notificar();
  },

  obtenerPregunta: function (id) {
    var filtrado = modelo.preguntas.find(data => data.id === id)
    return filtrado
  },

  //Se edita una pregunta
  editarPregunta: function(data, id){
    this.preguntas.forEach(function (element, i) {
      if (element.id === id){
        modelo.preguntas[i].textoPregunta = data[0];
      }
    });
    this.guardar();  
    this.preguntaEditada.notificar();
  },

  //Borrar todas las preguntas
  borrarTodo: function () {
    this.preguntas = [];
    this.guardar();
    this.limpiarPreguntas.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },
};
