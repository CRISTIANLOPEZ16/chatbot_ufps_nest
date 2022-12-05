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