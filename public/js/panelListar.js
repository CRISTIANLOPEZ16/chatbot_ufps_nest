import { alerta } from './alerta.js';
import { autoAlerta } from './alerta.js';

var datos = '';

$(document).ready(async function () {
  var datos = {
    take: 10,
    skip: 0,
  };
  var info = '';
  await fetch('//ingsistemasufps.es/persona', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then((data) => (info = data))
    .catch((error) => console.error(error));

  let html = ``;
  info.response[0].forEach((element) => {
    html +=
      `<div id="listado" class="content">
            <div class="tarjeta">
              <div class="titulo" id="n-`+element.id+`" >` +element.nombre +`</div>
              <div class="titulo" id="a-`+element.id+`" >` +element.apellido +`</div>
              <div class="cuerpo">
                <div class="boton"><a class="btn" id="editar" data-id="`+element.id+`" href="#">Editar</a><a class="btn" id="eliminar" data-id="`+element.id+`" href="#">Eliminar</a></div>
              </div>
            </div>
          </div>`;
  });

  $('#listado').html(html);
});



$(document).on('click', '#eliminar', async function () { 
    try {
      var info = '';
      let url='//ingsistemasufps.es/administrador/'+$(this).attr("data-id");

      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => (info = data))
        .catch((error) => console.error(error));

      url='//ingsistemasufps.es/persona/'+$(this).attr("data-id");

      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => (info = data))
        .catch((error) => console.error(error));

        autoAlerta(
          'Elimimado correctamente!',
          'success',
          2000,
          '/administrador/panel/listar',
        );
    } catch (e) {
      alerta(e, 'error');
    }

});



$(document).on('click', '#editar', async function () {

  let id=$(this).attr("data-id");

  let html = `<div class="container">
        <h4>Editar Administrador </h4><br>
        <form action="" method="POST">
          <div class="ventana">
            <div class="left">
              <label>Nombres:</label>
              <input id="nombres" type="text" placeholder="Nombres" value="`+$('#n-'+id).html()+`"/><br>
              <label>Apellidos:</label>
              <input id="apellidos" type="text" placeholder="Apellidos" value="`+$('#a-'+id).html()+`"/>
              <div class="opciones">
                      <div class="boton"><a class="act" data-id="`+id+`" id="actualizar" href="#">Guardar </a></div>
                    </div>
            </div>
        </form>
      </div>
      `;
      Swal.fire({
      title: '',
      html: html,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Cancelar',
      });



});


$(document).on('click', '#actualizar', async function () {
  var datos = {
    nombre: $('#nombres').val(),
    apellido: $('#apellidos').val()
  };
  try {
    let url='//ingsistemasufps.es/persona/'+$(this).attr("data-id");
    var info = '';
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => (info = data))
      .catch((error) => console.error(error));

    if (info.status == 401) {
      alerta(datos.response, 'error');
    }else if (info.status == 200 || datos.status == 201) {

      autoAlerta(
        'Datos actualizados correctamente!',
        'success',
        3000,
        '/administrador/panel/listar',
      );
   }
  
} catch (e) {
  alerta(e, 'error');
}
});