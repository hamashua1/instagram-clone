import { pool } from "../Database/Db.ts"
import bcrypt from "bcrypt"
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


interface hello {
    email: string,
    password: string,
    userName: string,
    bio: string,
    profile_pic_url: string
}


export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, userName, bio, profile_pic_url } = req.body as hello
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const results = await pool.query(`INSERT INTO users (email, hashpassword,username, bio, profile_pic_url) 
       VALUES ($1, $2, $3. $4, $5) RETURNING id, username, email`,
            [email, hashPassword, userName, bio, profile_pic_url])

        results.rows[0]
        res.status(201).json({ message: 'successfully added to database' })

    } catch (err) {
        console.error(err)
        res.status(401).json({ message: `failed to create user` })
    }
}


export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const results = await pool.query(`SELECT * FROM users WHERE email=$1, [email]`)
        if (!results) {
            throw new Error('email not found')
        }
        const user = results.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new Error('password invalid')
        }
        if (!process.env.JWT_SECRET) {
      throw new Error("environment viarables not found")
    }
    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, { expiresIn: '30m' })
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 30 * 30 * 500 })

        res.status(201).json({ message: 'successfully signed in', results, isPasswordCorrect,token })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'sign in not successfull check your credentials' })
    }
}

