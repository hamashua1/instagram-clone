import express from 'express'
const router = express.Router()
import { createUser } from '../controllers/createUserController.ts'


router.post('/api/createUser',createUser)



