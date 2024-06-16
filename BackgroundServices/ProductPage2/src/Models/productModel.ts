import { Request } from "express"

export interface ProductRequest extends Request{
    body:{
        product_Name:string
        product_Description:string
        product_Price:number
        category_Id:string
    }
}

export interface Products{
    product_Id:string
    product_name:string
}