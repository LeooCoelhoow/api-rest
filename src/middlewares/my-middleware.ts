import { Request, Response, NextFunction } from "express" // Importando para poder utilizar a tipagem

// usa-se o next também para não parar com a próxima requisição
export function myMiddleware(request:Request, response:Response, next:NextFunction){
  request.user_id = "123456"
  console.log("Opa")

  return next()
}
