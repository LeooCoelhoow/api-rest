import express from "express"
import { request } from "http"
import { myMiddleware } from "./middlewares/my-middleware"

const PORT = 3333

const app = express()
app.use(express.json()) // O Express espera que seja informado o tipo de dados no body (sendo mais comum o JSON ou XML)

app.use(myMiddleware) // Para usar de forma global em todas as rotas (usar sempre antes das rotas)

app.get("/products", (request, response) => {
  //  /products?page=1&limit=10
  const {page, limit} = request.query

  response.send(`Página ${page} de ${limit}`)
})

app.post("/products", myMiddleware, (request, response) => { // Uso local do middleware
  const {name, price} = request.body // const recebendo os mesmos nomes do body no insomnia

  // response.send(`Produto ${name}, preço ${price}`)
  response.status(201).json({name, price})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
