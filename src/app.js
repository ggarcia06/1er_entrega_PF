import express from "express";
import productsRouter from '../src/routes/productsRouter.js'
import cartRouter from '../src/routes/cartRouter.js'
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import { Server } from 'socket.io'
import viewRouter from './routes/views.router.js'


import ObjManager from "./Manager.js";
const pathProducts = "./data/productos.json"
const products = new ObjManager(pathProducts)
const pathCart = "./data/carrito.json"
const carts = new ObjManager(pathCart)

const app = express()
const port = 8080

const server = app.listen(port, () => console.log("Servidor corriendo en puerto " + port))
const io = new Server(server)

// // middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine())


// // Routes

app.use(viewRouter)

app.use("/api/products/", productsRouter)

app.use("/api/carts/", cartRouter)

app.use(viewRouter)

export { app, products, carts, pathCart };