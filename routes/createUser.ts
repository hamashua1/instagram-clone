import express from 'express'
const router = express.Router()
import { createUser , signIn } from '../controllers/createUserController.ts'



router.post('/api/createUser',createUser)
router.post('/api/signin', signIn)

