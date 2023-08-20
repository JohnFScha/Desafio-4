const socket = io()

const form = document.getElementById('formProduct')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) 
    const producto = Object.fromEntries(datForm)
    socket.emit('nuevoProducto', producto)
    socket.on('productosActualizados', (products) => {
      
      updateProductList(products);

      Swal.fire({
        title: 'Producto añadido correctamente!',
        icon: 'success'
      })
    })
    e.target.reset()
})


// Funcion para añadir arituclos al HTML en timepo real.
function updateProductList(products) {
  const productListContainer = document.getElementById('productList');
  productListContainer.innerHTML = '';

  products.forEach((product) => {
    const productHTML = `
      <article id="prod">
        <h2>Producto: <strong>${product.title}</strong></h2>
        <p>Descripcion: <strong>${product.description}</strong></p>
        <p>Cantidad: <strong>${product.stock}</strong></p>
        <p>Precio: <strong>${product.price}</strong></p>
      </article>
    `;
    productListContainer.innerHTML += productHTML;
  });
}