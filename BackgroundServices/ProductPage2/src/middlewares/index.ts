import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { log } from 'console'
import { Payload } from '../Models/authModel'
//import { Request } from 'mssql'
dotenv.config({path:path.resolve(__dirname,"../../.env")})

export interface ExtendedRequest1 extends Request{
    info?:Payload
}

export function verifyToken(req:ExtendedRequest1, res:Response, next:NextFunction){
    try{
        // reading token
        const token = req.headers['token'] as string

        // if there's a token
        if(!token){
            return res.status(401).json({message:'No access'})
        }

        //decoding data in token
        const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload
        req.info=decodedData

    } catch (error){

        return res.status(500).json(error)
    }

    next()
}