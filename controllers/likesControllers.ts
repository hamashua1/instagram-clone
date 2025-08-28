import type { Request, Response } from 'express'
import { pool } from "../Database/Db.ts"



export const likes = async(req:Request, res:Response)=>{
            const {post_id} = req.body
            const {user_id} = req.params
            const results = await pool.query(`INSERT INTO likes (user_id, post_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, post_id) DO NOTHING
       RETURNING *`,[user_id, post_id] )
      
    
}