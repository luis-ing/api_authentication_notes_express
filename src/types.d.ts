
export interface Output {
  id: number | null
  mail: mail | null
  name: string | null
}

export interface TokenPayload {
  userId: number | null
}

export interface Token {
  token: string | null
}

declare global {
  namespace Express {
    interface Request {
      user?: any // Aquí puedes especificar el tipo de datos de `user` si lo conoces
    }
  }
}
