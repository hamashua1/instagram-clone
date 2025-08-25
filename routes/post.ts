import express from 'express'
const router = express.Router()
import { post } from '../controllers/postControllers'
import { authenticateToken } from '../AuthService/auth'



router.post('/api/post', authenticateToken, post)


