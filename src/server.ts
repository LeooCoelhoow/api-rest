import express, { Request, Response, NextFunction } from "express"
import { routes } from "./routes" //por padrão vai pegar o arquivo que tem o nome de index

const PORT = 3333

const app = express()
app.use(express.json()) // O Express espera que seja informado o tipo de dados no body (sendo mais comum o JSON ou XML)

app.use(routes)

//Para tratar exceções tem que ser depois de tudo (como criar os middlewares, rotas...)
app.use((error:any, request:Request , response:Response , _: NextFunction) => {
  response.status(500).json({ message: "Erro no servidor!" })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
