export interface User{
    user_Id:string,
    user_Name:string,
    user_Email:string,
    password_Hash:string,
    isDeleted:number,
    isEmailSent:number

}

export interface Payload{
    Sub:string,
    user_Name:string

}

