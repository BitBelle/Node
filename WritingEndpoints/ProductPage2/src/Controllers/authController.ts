import {Request, Response, RequestHandler} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { RegisterSchema } from '../Helpers'
import Bcrypt from 'bcrypt'
import { Payload, User } from '../Models/authModel'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { log } from 'console'
import { ExtendedRequest1 } from '../middlewares'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


export const registerUser = async (req:Request, res:Response)=>{
    try{
        const id = uid()
       // console.log(req.body);
        
        const {user_Name, user_Email, password_Hash} = req.body
        const {error} = RegisterSchema.validate(req.body)

        if (error){
            return res.status(400).json(error.details[0].message)
        }

        const HashPassword =  await Bcrypt.hash(password_Hash,10)
        let pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input("user_Id", id)
        .input("user_Name", user_Name)
        .input("user_Email", user_Email)
        .input("password_Hash", HashPassword)
        .execute("addUser")

        return res.status(201).json({message:"User added successfully"})

    } catch (error){
        return res.status(500).json(error)

    }
    
}


export const loginUser = async(req:Request, res:Response)=>{
    try{
        const {user_Email, password_Hash} = req.body

        let pool = await mssql.connect(sqlConfig)
        let user = (await pool.request()
        .input("user_Email", user_Email)
        .execute('getUser')).recordset as User[]

        if (user.length!==0){
            const isValid = await Bcrypt.compare(password_Hash, user[0].password_Hash)

    
        if (isValid){
            const payload:Payload={
                Sub:user[0].user_Id,
                user_Name:user[0].user_Name
            }
            const token = await jwt.sign(payload, process.env.SECRET as string, {expiresIn:'8h'})
            return res.status(200).json({message:"Login Successful!", token})
        }
        }
        

        return res.status(400).json({message:"Invalid Credentials"})

    } catch (error){
        return res.status(500).json(error)

    }

}



export const welcomePage=(req:ExtendedRequest1, res:Response)=>{
    try{
        res.status(200).send(`<h2> Welcome ${req.info?.user_Name} </h2>`)
    
    } catch (error){
        
    }
}
