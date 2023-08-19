const socket = io()

socket.on('mensaje', () => {
  console.log('Mensaje recibido')
})
