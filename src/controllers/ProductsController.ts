import { Request, Response } from "express"
import { AppError } from "../utils/AppError"

class ProductsController {
  /** Um controller tem que receber até no máximo 5 métodos, mais que isso é viável outro controller
   * index - GET para listar
   * show - GET para exibir um registro específico
   * create - POST para criar registro
   * update - PUT para atualizar
   * remove - DELETE para remover um registro
  */

  index(request: Request, response: Response) {
    //  /products?page=1&limit=10
    const {page, limit} = request.query
    
    response.send(`Página ${page} de ${limit}`)
  }

  create(request: Request, response: Response){
    const {name, price} = request.body // const recebendo os mesmos nomes do body no insomnia

    //throw new AppError("Erro")

    // response.send(`Produto ${name}, preço ${price}`)
    response.status(201).json({name, price, user_id: request.user_id})
  }



}

export { ProductsController }