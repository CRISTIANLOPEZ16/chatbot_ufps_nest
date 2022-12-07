import { alerta } from "./alerta.js";
import { autoAlerta } from "./alerta.js";

var datos = "";


$( document ).ready( async function() {
    var datos = {
        "take":10,
        "skip":0
    }
    var info='';
    await fetch('http://localhost:3000/persona', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
        .then(response => response.json())
        .then(data =>
            info=data
            )
        .catch(error => console.error(error))
        
        let html=``;
        info.response[0].forEach(element => {
            html+=`<div id="listado" class="content">
            <div class="tarjeta">
              <div class="titulo">`+element.nombre+` `+element.apellido+`</div>
              <div class="cuerpo">
                <div class="boton"><a class="btn" href="#">Editar</a><a class="btn" href="#">Eliminar</a><a class="btn" href="#">Agregar Permisos</a></div>
              </div>
            </div>
          </div>`;
        });
 
        $('#listado').html(html);

});


