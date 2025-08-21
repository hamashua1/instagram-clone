import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import "./Database/Db.ts"
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT
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

app.listen(PORT,()=>{
    console.log(`application is using port 💻 ${PORT}`)
})
