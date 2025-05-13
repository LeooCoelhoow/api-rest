import { Request, Response } from "express"
import { AppError } from "../utils/app-error"
import { z } from "zod"

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
    // Como utilizar o Zod para validar os dados do body
    // z.(tipo de dado).(validação)
    // z.string().min(6) - string com no mínimo 6 caracteres
    const bodySchema = z.object({
      name: z.string().min(6),
      price: z.number().positive()
    })

    const { name, price } = bodySchema.parse(request.body) // Faz a validação do body, se não passar, retorna um erro

    /**
    if(!name){
      throw new AppError("Nome do produto é obrigatório!")
    }

    if(name.trim().length < 6){
      throw new AppError("Nome do produto deve ter mais de 5 caracteres!")
    }

    if(!price){
      throw new AppError("Preço do produto é obrigatório!")
    }

    if(price < 0){
      throw new AppError("Preço do produto deve ser maior que zero!")
    }
    */

    //throw new AppError("Erro")

    // response.send(`Produto ${name}, preço ${price}`)
    response.status(201).json({name, price, user_id: request.user_id})
  }
}

export { ProductsController }