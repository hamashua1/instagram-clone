import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response } from 'express'
import { pool } from "../Database/Db.ts"
import jwt from 'jsonwebtoken'
import 'dotenv/config'


interface MyJwtPayload extends JwtPayload {
    id: string,
    role: 'admin' | 'user'
}


export const authenticateToken = async (req: Request, res: Response, next: () => void) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("environment viarables not found")
    }

    const token = req.cookies?.token
    if(!token){
        throw new Error('token not found')
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
    const result = await pool.query('SELECT id, email FROM users WHERE id=$1', [verify.id])
    if(result.rows.length===0){
        return res.status(401).json({message:'user not found'})
    }
    next()
}
