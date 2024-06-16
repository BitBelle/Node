import {Request, Response, RequestHandler, response} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { CategoryRequest, Category } from '../Models/categoryModel'
// import { Products } from '../Models/productModel'


export const addCategory = async (req:CategoryRequest, res:Response) => {
    try{
        const id = uid()
        const {category_Name, category_Description} = req.body

        let pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('category_Id', id)
        .input('category_Name', category_Name)
        .input('category_Description', category_Description)
        .execute('addCategory')

        res.status(201).json({mesage: "Category Added"})


    }catch(error:any){
        return res.status(500).json(error.message)

    }
}


export const getCategories = async(req:Request, res:Response) => {
    try{
        
        let pool = await mssql.connect(sqlConfig)
        let categories = (await pool.request().execute('getCategories')).recordset as Category[]

        return res.status(200).json(categories)

    } catch(error:any){
        return res.status(500).json(error.message)

    }

}

    