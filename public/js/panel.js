import { alerta } from "./alerta.js";
import { autoAlerta } from "./alerta.js";
import { htmlAlerta } from "./alerta.js";
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


$(document).on('click', '#masiva', function () {

    let html=`<div class="container">
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
                })
                var selectedFile;
                    document.getElementById("fileUpload").addEventListener("change", function(event) {
                        selectedFile = event.target.files[0];
                      });
                    document
                      .getElementById("uploadExcel")
                      .addEventListener("click", function() {
                        if (selectedFile) {
                          var fileReader = new FileReader();
                          fileReader.onload = function(event) {
                            var data = event.target.result;
                
                            var workbook = XLSX.read(data, {
                              type: "binary"
                            });
                            workbook.SheetNames.forEach(sheet => {
                              let rowObject = XLSX.utils.sheet_to_row_object_array(
                                workbook.Sheets[sheet]
                              );
                              rowObject.forEach(element => {
                                console.log(element.Pregunta);
                              });
                            });
                          };
                          fileReader.readAsBinaryString(selectedFile);
                        }
                      });
            


})



