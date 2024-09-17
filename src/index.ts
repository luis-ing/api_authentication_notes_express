import express from 'express'
import userRouter from './routes/user'
import notesRouter from './routes/notes'

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/ping', (_, res) => {
  console.log('Hola mundo')
  res.send('pong')
})

app.use('/api/user', userRouter)
app.use('/api/notes', notesRouter)

app.listen(PORT, () => {
  console.log('Server on port http://localhost:', PORT)
})
