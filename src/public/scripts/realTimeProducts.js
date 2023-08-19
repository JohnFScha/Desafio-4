const socket = io()

const form = document.getElementById('formProduct')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) 
    const prod = Object.fromEntries(datForm)
    console.log(prod)
    socket.emit('nuevoProducto', prod)
    socket.on('mensajeProducto', (mensaje) => {
        Swal.fire({
          title: mensaje,
          icon: 'success'
        })
    })
    e.target.reset()
})