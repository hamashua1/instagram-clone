import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT









app.listen(PORT,()=>{
    console.log(`application is using port 💻 ${PORT}`)
})
