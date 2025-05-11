import { Router } from "express"
import { myMiddleware } from "../middlewares/my-middleware"

const productsRoutes = Router()

productsRoutes.get("/:id", (request, response) => {
  //  /products?page=1&limit=10
  const {page, limit} = request.query

  response.send(`Página ${page} de ${limit}`)
})

productsRoutes.post("/", myMiddleware, (request, response) => { // Uso local do middleware
  const {name, price} = request.body // const recebendo os mesmos nomes do body no insomnia

  // response.send(`Produto ${name}, preço ${price}`)
  response.status(201).json({name, price, user_id: request.user_id})
})

export { productsRoutes }