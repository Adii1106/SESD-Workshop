import express from 'express'
import cors from 'cors'
import { authRouter, quizRouter } from './routes'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/quizzes', quizRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
