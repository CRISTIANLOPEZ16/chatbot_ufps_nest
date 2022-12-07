import { alerta } from "./alerta.js";
import { autoAlerta } from "./alerta.js";

var datos = "";


$( document ).ready( async function() {
    

});



$(document).on('click', '#agregarUsuario', async function () {
    var datos = {
        "persona": {
          "nombre": $('#nombres').val(),
          "apellido": $('#apellidos').val(),
          "correo": $('#correo').val(),
          "password": $('#password').val(),
          "tipoUsuario": "ADMINISTRADOR"
        }
      }
    
    try{

        var info='';
        await fetch('http://localhost:3000/administrador', {
            method: 'POST',
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
        

        if(info.status==401){
            alerta(datos.response,'error');
        }else if(info.status==200 || datos.status==201){
            autoAlerta('Administrador '+$('#nombres').val()+ ' agregado correctamente!','success',5000,'/administrador/panel/listar');
        }
    }catch(e){
        alerta(e,"error");
    }

})


