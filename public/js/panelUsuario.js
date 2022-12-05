import { alerta } from "./alerta.js";
import { autoAlerta } from "./alerta.js";

var datos = "";

$(document).on('click', '#agregarUsuario', function () {
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
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/administrador",
            dataType: "json",
            data: datos,
            async: false,
            success: function (response) {
            console.log(response);
            datos = response;
            },
        });
    }catch(e){
        alerta(e,"error");
    }

    if(datos.status==401){
        alerta(datos.response,'error');
    }else if(datos.status==200 || datos.status==201){
        autoAlerta('Administrador'+$('#nombres').val()+ 'Agregado','success',5000,'/administrador/panel');
    }
    

})