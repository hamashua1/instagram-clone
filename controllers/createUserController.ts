import { pool } from "../Database/Db.ts"
import bcrypt from "bcrypt"
import type {Request , Response} from 'express'


interface hello {
    email:string,
    password:string,
    userName:string,
    bio:string,
    profile_pic_url:string
}


export const createUser = async (req: Request , res:Response)=>{
    try{
    const {email, password , userName, bio, profile_pic_url} = req.body as hello
    const saltRounds = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const results = await pool.query(`INSERT INTO users (email, hashpassword,username, bio, profile_pic_url) 
       VALUES ($1, $2, $3. $4, $5) RETURNING id, username, email`,
      [email, hashPassword,userName,bio, profile_pic_url])

      results.row[0]
      res.status(201).json({message:'successfully added to database'})

    }catch(err){
        console.error(err)
        res.status(401).json({message:`failed to create user`})
    }
}