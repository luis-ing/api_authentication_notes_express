import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types'
import env from 'dotenv'
env.config()

const verifyToken = (req: Request, res: Response, next: NextFunction): undefined => {
  try {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader == null) {
      res.status(401).json({ error: 'Acceso denegado, token no proporcionado' })
      return undefined
    }

    const token = authorizationHeader.split(' ')[1]

    if (token === null) {
      res.status(401).json({ error: 'Acceso denegado, token no proporcionado' })
      return undefined
    }
    const decoded = jwt.verify(token, process.env.SECURITY_KEY as string) as TokenPayload
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ error: 'Token no válido' })
  }
}

export default verifyToken
