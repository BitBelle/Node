import {Request, Response, RequestHandler} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import { ProductRequest, Products } from '../Models/productModel'
import mssql from 'mssql'
import { error } from 'console'

export const addProduct = async(req:ProductRequest, res:Response)=>{
    try{
        const id = uid()
        
            console.log(req.body);
            
        const {product_Name,product_Description,product_Price, category_Id} = req.body

        if (!product_Name || !product_Description || !product_Price || !category_Id) {
            return res.status(400).json({message: "All fields are required"});
        }

        // conection to db
        const pool = await mssql.connect(sqlConfig)

        // request to db
        await pool.request()
        //what the procedure expects
        .input("product_Id", id)
        .input("product_Name", product_Name)
        .input("product_Description", product_Description)
        .input("product_Price", product_Price)
        .input("category_Id", category_Id)
        .execute('addProduct')

        return res.status(201).json({mesage: "Product Created"})


    }catch (error){

        res.status(500).json(error)

    }
    
}

export const getProducts:RequestHandler = async(req,res) =>{
    try{
        const pool = await mssql.connect(sqlConfig)

        // request to db
        const products = (await pool.request().execute('getProducts')).recordset as Products[]

        res.status(200).json(products)

    }catch (error){
        res.status(500).json(error)
    }
}

export const getProduct = async(req:Request<{id:string}>,res:Response) =>{
    try{
        const pool = await mssql.connect(sqlConfig)

        // request to db
        const product = (await pool.request()
            .input("product_Id", req.params.id)
            .execute("getProduct")).recordset[0] as Products

        res.status(200).json(product)

    }catch (error){
        res.status(500).json(error)
    }
}


export const updateProduct = async(req:Request<{id:string}>,res:Response) =>{
    try{
        const pool = await mssql.connect(sqlConfig)

        // request to db
        const product = (await pool.request()
            .input("product_Id", req.params.id)
            .execute("getProduct")).recordset[0] as Products

            if (product && product.product_Id){
                //update
                const {product_Name, product_Description, product_Price} = req.body
                await pool.request()
                .input('product_Id', req.params.id)
                .input('product_Name', product_Name)
                .input('product_Description', product_Description)
                .input('product_Price', product_Price)
                .execute('updateProduct')

                return res.status(200).json({message:"Product Updated"})
            }

        res.status(404).json({message: "Product not Found"})

    }catch (error){
        res.status(500).json(error)
    }
}

export const deleteProduct = async(req:Request<{id:string}>,res:Response) =>{
    try{
        const pool = await mssql.connect(sqlConfig)

        // request to db
        const product = (await pool.request()
            .input("product_Id", req.params.id)
            .execute("deleteProduct")).recordset[0] as Products

            if (product && product.product_Id){
                //delete
                await pool.request()
                
                .input('product_Id', req.params.id)
                .execute('deleteProduct')

                return res.status(200).json({message:"Product Deleted"})
            }

        res.status(404).json({message: "Product not Found"})

    }catch (error){
        res.status(500).json(error)
    }
}