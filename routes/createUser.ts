import express from 'express'
const router = express.Router()
import { createUser , signIn } from '../controllers/createUserController.ts'
import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'too many requests'
})

router.post('/api/createUser', authLimiter, createUser)
router.post('/api/signin', authLimiter, signIn)

export default router

