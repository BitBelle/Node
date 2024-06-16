import mssql from 'mssql'
import ejs from 'ejs'
import { sqlConfig } from '../config'
import { log } from 'console'
import path from 'path'
import dotenv from 'dotenv'
import { sendEmail } from '../Helpers'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


export interface User{
    user_Id:string,
    user_Name:string,
    user_Email:string,
    password_Hash:string,
    isDeleted:number,
    isEmailSent:number

}

export async function run(){
    try{
        let pool = await mssql.connect(sqlConfig)
        let users = await (await pool.request().query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[]
        //console.log(users)
        users.forEach(user=>{

            // message option
            ejs.renderFile("../../Templates/register.ejs", {user_Name:user.user_Name}, async (error, data)=>{
                
                let messageOptions ={
                    to:user.user_Email,
                    from:process.env.user_Email,
                    subject:"Yay! Welcome to our page!",
                    html:data
                    }
                    
                    await sendEmail(messageOptions)

                    await pool.request().query(`UPDATE Users SET isEmailSent=1 WHERE user_Id='${user.user_Id}'`)
             })
        })

    } catch (error){

    }
}




// interface User{
//     user_Id:string,
//     user_Email:string,
//     user_Name:string,
//     password_Hash:string,
//     isDeleted:number,
//     isEmailSent:number
// }


// export async function run(){
//     try{
//         let pool = await mssql.connect(sqlConfig)
//         let users = await (await pool.request().query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[]
        
//         users.forEach(user=>{

//             ejs.renderFile("Templates/register.ejs", {user_Name:user.user_Name}, (error, data)=>{

//                 let messageOptions ={
//                     to:user.user_Email,
//                     from:process.env.user_Email,
//                     subject:"Yayy! Welcome to our product page!",
//                     html:data
//                 }

//                 await sendEmail(messageOptions)

//                 await pool.request().query(`UPDATE Users SET isEmailSent=1 WHERE user_Id=${user.user_Id}`)
//             })

//         })

//     } catch (error){

//     }

// }

// function sendEmail(messageOptions: { to: string; from: string | undefined; subject: string; html: string }) {
//     throw new Error('Function not implemented.')
// }


