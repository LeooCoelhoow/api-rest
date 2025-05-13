import express, { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

import { routes } from "./routes" //por padrão vai pegar o arquivo que tem o nome de index

import { AppError } from "./utils/app-error"

const PORT = 3333

const app = express()
app.use(express.json()) // O Express espera que seja informado o tipo de dados no body (sendo mais comum o JSON ou XML)

app.use(routes)

//Para tratar exceções tem que ser depois de tudo (como criar os middlewares, rotas...)
/**
 * Status Code
 * 400 (Bad request): Erro do cliente
 * 500 (Internal Server Error): Erro do interno do servidor
 */
app.use(((error: any, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if(error instanceof ZodError){ // Erro de validação do Zod
    return response
    .status(400)
    .json({ message: "Validation error!", issues: error.format() })
  }
  
  response.status(500).json({ message: "Erro no servidor!" });
}) as express.ErrorRequestHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
