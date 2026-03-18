import express from 'express'
const router = express.Router()
import { post } from '../controllers/postControllers.ts'
import { likes } from '../controllers/likesControllers.ts'
import { authenticateToken } from '../AuthService/auth.ts'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'too many requests'
})

router.post('/api/post', limiter, authenticateToken, post)
router.post('/api/likes', limiter, authenticateToken, likes)

export default router
