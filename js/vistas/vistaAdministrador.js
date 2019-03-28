/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.limpiarPreguntas.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var nuevoItem = $('<li></li>').addClass("list-group-item").attr("id", pregunta.id);
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val();
        respuestas.push({textoRespuesta: respuesta, cantidad: 0});
        //completar
      })
       if (respuestas[0].textoRespuesta === ""){
        Swal.fire({
          type: "error",
          title: "Debe ingresar datos para crear una pregunta",
          showConfirmButton: true,
          confirmButtonColor: "#EA1D5E",
        });
        }else {
          for (var i=0;i<respuestas.length;i++){
            if (respuestas[i].textoRespuesta === ""){
              respuestas.splice(i,1)
            }
          }
           contexto.limpiarFormulario();
           contexto.controlador.agregarPregunta(value, respuestas);
        }
    })

    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if (isNaN(id)) {
        Swal.fire({
          title: "seleccione la respuesta que desea borrar",
          showConfirmButton: true,
          confirmButtonColor: "#EA1D5E",
          
        });
      }else {
        contexto.limpiarFormulario();
        contexto.controlador.quitarPregunta(id);
      }
    })

    e.borrarTodo.click(function() {
      contexto.limpiarFormulario();
      contexto.controlador.borrarTodo();
    })

    e.botonEditarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      if (isNaN(id)) {
        Swal.fire({
          title: "seleccione una respuesta para editar",
          showConfirmButton: true,
          confirmButtonColor: "#EA1D5E",
        });
      } else {
          var resultadoPregunta = contexto.controlador.obtenerPregunta(id);
          Swal.mixin({
              input: 'text',
              confirmButtonText: 'Editar',
              showCancelButton: true,
              confirmButtonColor: "#EA1D5E",
           }).queue([
                {
                  title: 'Ingrese la nueva pregunta' ,
                  input: 'text',
                  confirmButtonColor: "#EA1D5E",
                  inputValue: resultadoPregunta.textoPregunta,
                },

            ]).then((result) => {
               if (result.value) {
                  contexto.limpiarFormulario();
                  contexto.controlador.editarPregunta(result.value, id);
                }
    });
  }})},

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
