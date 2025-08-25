import { pool } from "../Database/Db.ts"
import type { Request, Response } from 'express'
import 'dotenv/config'



export const post = async (req: Request, res: Response) => {
    try {
        const { media_url, caption } = req.body
        const results = await pool.query(`INSERT INTO post (media_url, caption) 
       VALUES ($1, $2) RETURNING id, media_url, caption`,
            [media_url, caption])

        res.status(201).json({ message: 'saved successfully', result: results.rows[0] })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'unable to save to database' })
    }

}