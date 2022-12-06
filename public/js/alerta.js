var selectedFile;

export function alerta(mensaje,tipo){
    Swal.fire({
        title: '',
        text: mensaje,
        icon: tipo,
        confirmButtonText: 'Aceptar'
      })
}

export function autoAlerta(mensaje,tipo,tiempo,ruta){
    let timerInterval
    Swal.fire({
    title: '',
    icon: tipo,
    html: mensaje,
    timer: tiempo,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        window.location.href = ruta;
    })
}


export function htmlAlerta(mensaje){
    Swal.fire({
    title: '',
    html: mensaje,
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
}

