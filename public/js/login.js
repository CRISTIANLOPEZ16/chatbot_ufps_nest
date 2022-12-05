import { alerta } from "./alerta.js";
import { autoAlerta } from "./alerta.js";

var datos = "";

$(document).on('click', '#log', function () {
    var usuario = {"correo":$('#correo').val(),"password":$('#password').val()}
    try{
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/persona/log",
            dataType: "json",
            data: usuario,
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
        autoAlerta('Bienenido','success',1000,'/administrador/panel');
    }

});