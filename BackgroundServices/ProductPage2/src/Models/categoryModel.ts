import { Request } from "express"

export interface CategoryRequest extends Request{
    body:{
        category_Name:string
        category_Description:string
    }
}


export interface Category{
    category_Id:string
    category_name:string
}