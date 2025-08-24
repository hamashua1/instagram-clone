import express from 'express'
const app = express()
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import "./Database/Db.ts"
import rateLimit from 'express-rate-limit'
import createUserRoutes from './routes/createUser.ts'
app.use(createUserRoutes)
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT

// 15min with 100 request rate limit to all my api routes

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'too many requests'
})
app.use('/api/', limiter)

import { createUsersTable } from "./Schemas/userTable.ts"
import { createPostsTable } from "./Schemas/postTable.ts"
import { createLikesTable } from "./Schemas/likesTable.ts"
import { createFollowersTable } from "./Schemas/followersTable.ts"

async function DB() {
    await createUsersTable();
    await createPostsTable();
    await createLikesTable();
    await createFollowersTable();
}

DB()

app.listen(PORT, () => {
    console.log(`application is using port 💻 ${PORT}`)
})
