import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  listNote: async (req: Request, res: Response) => {
    try {
      const { id } = req.user
      const userData = await prisma.notes.findMany({
        where: {
          userCreated: id
        }
      })
      return res.status(200).json({ data: userData })
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrio un error, intentelo más tarde' })
    }
  },
  addNote: async (req: Request, res: Response) => {
    try {
      const { id } = req.user
      const { title, content } = req.body
      if (title == null || content == null) {
        return res.status(400).json({ error: 'Ingrese texto en el titulo y contenido' })
      }
      await prisma.notes.create({
        data: {
          title, content, userCreated: id, userUpdated: id, dateCreated: new Date(), dateUpdated: new Date()
        }
      })
      return res.status(201).json({ message: 'Nota creada correctamente' })
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrio un error, intentelo más tarde' })
    }
  },
  updateNote: async (req: Request, res: Response) => {
    try {
      const { id } = req.user
      const { idNote, title, content } = req.body
      if (idNote == null || title == null || content == null) {
        return res.status(400).json({ error: 'Ingrese texto en el titulo y contenido' })
      }
      await prisma.notes.update({
        where: {
          id: idNote
        },
        data: {
          title, content, userUpdated: id, dateUpdated: new Date()
        }
      })
      return res.status(200).json({ message: 'Nota actualizada correctamente' })
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrio un error al intentar actualizar la nota, intentelo más tarde' })
    }
  },
  deleteNote: async (req: Request, res: Response) => {
    try {
      const { id } = req.user
      const { idNote } = req.body
      if (idNote == null) {
        return res.status(400).json({ error: 'Ingrese el id de la nota a eliminar' })
      }
      await prisma.notes.update({
        where: {
          id: idNote, userCreated: id
        },
        data: {
          isActive: false, userUpdated: id, dateUpdated: new Date()
        }
      })
      return res.status(200).json({ message: 'Nota eliminada correctamente' })
    } catch (error) {
      return res.status(500).json({ error: 'Hubo un problema al intentar eliminar la nota, la nota debe pertenecerte' })
    }
  }
}
