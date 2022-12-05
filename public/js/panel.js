import { alerta } from "./alerta.js";
import { autoAlerta } from "./alerta.js";

var datos = "";

$( document ).ready(function() {
    var datos = {
        "take":5,
        "skip":0
    }

    try{
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/pregunta",
            dataType: "application/json",
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

});




$(document).on('click', '#agregarPregunta', function () {
  
    var datos = {"descripcion":$('#pregunta').val(),
    "idConsulta": 1,
        "consulta": {
          "estado": "RESUELTA",
          "idCliente": 1
        }
    }

    try{
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/pregunta",
            dataType: "application/json",
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

    // if(datos.status==401){
    //     alerta(datos.response,'error');
    // }else if(datos.status==200 || datos.status==201){
    //     autoAlerta('Bienenido','success',1000,'/administrador/panel');
    // }

});