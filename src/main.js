import express from 'express';
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import path from 'path';
import ProductManager from "./utils/ProductManager.js";

const app = express();
const PORT = 4000;
const manager = new ProductManager('./src/JSON/products.json')

// Setear servidor
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

const io = new Server(server)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Setear view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

// Conexion con socket.io
io.on('connection', (socket) => {
  console.log('Conexion con socket')

  socket.on('nuevoProducto', (producto) => {
    manager.addProduct(producto);
    const products = manager.getProducts()
    socket.emit("productosActualizados", products)
  })
})

// Rutas
app.use('/static', express.static(path.resolve(__dirname, './public')))

// Handlebars
app.get('/static/realtimeproducts', (req, res) => {
  const products = manager.getProducts()
  res.render('realTimeProducts', {
    rutaCSS: 'styles',
    rutaJS: 'realTimeProducts',
    products: products
  })
})