// O ".d" no arquivo para identificar que vai ser usado para tipagem global

declare namespace Express {
  export interface Request {
    user_id: string
  }
}