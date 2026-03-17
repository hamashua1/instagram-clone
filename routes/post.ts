import express from 'express'
const router = express.Router()
import { post } from '../controllers/postControllers.ts'
import { likes } from '../controllers/likesControllers.ts'
import { authenticateToken } from '../AuthService/auth.ts'





router.post('/api/post', authenticateToken, post)
router.post('/api/likes', authenticateToken , likes)

export default router
