import express from 'express'
const router = express.Router()
import { post } from '../controllers/postControllers'
import { likes } from '../controllers/likesControllers'
import { authenticateToken } from '../AuthService/auth'





router.post('/api/post', authenticateToken, post)
router.post('/api/likes', authenticateToken , likes)

export default router
