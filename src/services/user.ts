import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import { Output } from '../types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

const prisma = new PrismaClient()

export default {
  addUser: async (req: Request, res: Response) => {
    try {
      const { name, mail, pass } = req.body
      const userData = await prisma.user.findFirst({
        where: {
          mail
        }
      })
      if (userData !== null) {
        return res.status(400).json({ error: 'El correo que esta utilizando, ya se encuentra registrado' })
      }
      const passHash = await bcrypt.hash(pass, 10)
      await prisma.user.create({
        data: {
          name, mail, pass: passHash, dateCreated: new Date()
        }
      })

      return res.status(201).json({ message: 'Usuario creado correctamente' })
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrio un error, intentelo más tarde' })
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { mail, pass } = req.body
      const userData = await prisma.user.findFirst({
        where: {
          mail
        }
      })
      if (userData == null) {
        return res.status(400).json({ error: 'El usuario ingresado, no se encuentra registrado' })
      }
      const isPassValid = await bcrypt.compare(pass, userData.pass as string)
      if (!isPassValid) {
        return res.status(400).json({ error: 'Contraseña incorrecta' })
      }

      const token = jwt.sign({ id: userData.id, mail }, process.env.SECURITY_KEY as string, { expiresIn: '1h' })

      const data: Output = {
        id: userData.id,
        mail: userData.mail,
        name: userData.name
      }

      return res.status(200).json({ token, data })
    } catch (error) {
      return res.status(500).json({ error: 'Ingrese los datos solicitados' })
    }
  }
}
