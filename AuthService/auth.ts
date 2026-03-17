import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response } from 'express'
import { pool } from "../Database/Db.ts"
import jwt from 'jsonwebtoken'
import 'dotenv/config'


interface MyJwtPayload extends JwtPayload {
    id: number,
}


export const authenticateToken = async (req: Request, res: Response, next: () => void) => {
    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'server configuration error' })
        }

        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ message: 'token not found' })
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
        const result = await pool.query('SELECT id, email FROM users WHERE id=$1', [verify.id])
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'user not found' })
        }

        req.user = { id: result.rows[0].id }
        next()
    } catch (err) {
        return res.status(401).json({ message: 'invalid token' })
    }
}
