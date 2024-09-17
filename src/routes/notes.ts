/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import notesActions from '../services/notes'
import verifyToken from '../middleware/verifyToken'

const router = express.Router()

router.get('/list', verifyToken, notesActions.listNote)

router.post('/add', verifyToken, notesActions.addNote)

router.put('/update', verifyToken, notesActions.updateNote)

router.delete('/delete', verifyToken, notesActions.deleteNote)

export default router
