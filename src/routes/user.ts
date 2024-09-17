/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import userActions from '../services/user'

const router = express.Router()

router.post('/add', userActions.addUser)

router.post('/login', userActions.login)

export default router
