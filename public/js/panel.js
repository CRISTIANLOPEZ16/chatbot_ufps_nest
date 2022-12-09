import { alerta } from './alerta.js';
import { autoAlerta } from './alerta.js';
import { htmlAlerta } from './alerta.js';
var datos = '';

$(document).ready(async function () {
  var datos = {
    take: 10,
    skip: 0,
  };
  var info = '';
  await fetch('//ingsistemasufps.es/respuesta', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then((data) => (info = data))
    .catch((error) => console.error(error));

  let html = `<h3>Listado de preguntas con sus Respuestas</h3><br>`;
  info.response[0].forEach((element) => {
    html +=
      `<div class="tarjeta">
          <label class="check" id="check">
            <input id="cbox1" type="checkbox" value="` +
      element.id +
      `"/><span class="checkmark"></span>
          </label>
          <div id="p-`+element.id+`" class="titulo">` +
      element.pregunta.descripcion +
      `</div>
          <div id="r-`+element.id+`" class="respuesta">` +
      element.descripcion +
      `</div>
          <div class="base"><div class="botone"><div class="editar" id="editar" data-id="`+element.id+`">Editar</div></div></div>
        </div>`;
  });

  $('#listado').html(html);
});

$(document).on('click', '#agregarPregunta', async function () {
  var datos = {
    descripcion: $('#respuesta').val(),
    pregunta: {
      id: 0,
      descripcion: $('#pregunta').val(),
      idConsulta: 0,
      consulta: {
        estado: 'RESUELTA',
      },
    },
    idPregunta: 0,
  };
  try {
    var info = '';
    await fetch('//ingsistemasufps.es/respuesta', {
      method: 'POST',
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
    } else if (info.status == 200 || datos.status == 201) {
      autoAlerta(
        'Pregunta agregada correctamente!',
        'success',
        3000,
        '/administrador/panel',
      );
    }

    autoAlerta(
      'Pregunta agregada correctamente!',
      'success',
      3000,
      '/administrador/panel',
    );

  } catch (e) {
    alerta(e, 'error');
  }
});

$(document).on('click', '#masiva', function () {
  let html = `<div class="container">
                <h4>Registro de preguntas con Excell</h4><br>
                <div class="panel panel-primary">
                    <div class="panel-body">
                        <!-- Input type file to upload excel file -->
                        <input type="file" id="fileUpload" accept=".xls,.xlsx" /><br /><br>
                        <button type="button" id="uploadExcel">Subir</button>

                        <!-- Render parsed JSON data here -->
                        <div style="margin-top:10px;">
                            <pre id="jsonData"></pre>
                        </div>
                    </div>
                </div>
            </div>
            `;
  Swal.fire({
    title: '',
    html: html,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: 'Cancelar',
  });
  var selectedFile;
  document
    .getElementById('fileUpload')
    .addEventListener('change', function (event) {
      selectedFile = event.target.files[0];
    });
  document.getElementById('uploadExcel').addEventListener('click', function () {
    if (selectedFile) {
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var data = event.target.result;

        var workbook = XLSX.read(data, {
          type: 'binary',
        });
        workbook.SheetNames.forEach((sheet) => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet],
          );
          rowObject.forEach((element) => {
            var datos = {
              descripcion: element.Respuesta,
              pregunta: {
                id: 0,
                descripcion: element.Pregunta,
                idConsulta: 0,
                consulta: {
                  estado: 'RESUELTA',
                },
              },
              idPregunta: 0,
            };
            try {
              var info = '';
              fetch('//ingsistemasufps.es/respuesta', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
              })
                .then((response) => response.json())
                .then((data) => (info = data))
                .catch((error) => console.error(error));
              autoAlerta(
                'Preguntas agregadas correctamente!',
                'success',
                3000,
                '/administrador/panel',
              );
            } catch (e) {
              alerta(e, 'error');
            }
          });
        });
      };
      fileReader.readAsBinaryString(selectedFile);
    }
  });
});

$(document).on('click', '#editar', async function () {

  let id=$(this).attr("data-id");
    let html = `<div class="container">
                  <h4>Editar Pregunta </h4><br>
                  <form action="" method="POST">
                    <label>Pregunta:</label>
                    <textarea cols="40" rows="8" class="area" id="pregunta" placeholder="">`+$('#p-'+id).html()+`</textarea><br>
                    <label>Respuesta:</label>
                    <textarea cols="40" rows="8" class="area" id="respuesta" placeholder="">`+$('#r-'+id).html()+`</textarea>
                    <div class="opciones">
                      <div class="boton"><a class="registrar" data-id="`+id+`" id="actualizar" href="#">Guardar </a></div>
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


$(document).on('click', '#eliminar', async function () {
  $('input[type=checkbox]:checked').each(function () {
    
    try {
      var info = '';
      let url='//ingsistemasufps.es/pregunta/'+$(this).val();

      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => (info = data))
        .catch((error) => console.error(error));
      autoAlerta(
        'Elimimadas correctamente!',
        'success',
        2000,
        '/administrador/panel',
      );
    } catch (e) {
      alerta(e, 'error');
    }

  });

});


$(document).on('click', '#actualizar', async function () {
  var datos = {
    descripcion: $('#respuesta').val(),
    pregunta: {
      id: $(this).attr("data-id"),
      descripcion: $('#pregunta').val(),
      idConsulta: $(this).attr("data-id"),
      consulta: {
        estado: 'RESUELTA',
      },
    }
  };
  try {
    let url='//ingsistemasufps.es/respuesta/'+$(this).attr("data-id");
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
   
      var datos = {
          id: $(this).attr("data-id"),
          descripcion: $('#pregunta').val()
        };

      let url2='//ingsistemasufps.es/pregunta/'+$(this).attr("data-id");
      var info = '';
      await fetch(url2, {
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
          'Pregunta actualizada correctamente!',
          'success',
          3000,
          '/administrador/panel',
        );
     }
    }
  } catch (e) {
    alerta(e, 'error');
  }
});