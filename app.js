const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const mysql=require('mysql2/promise')
const session=require('express-session')
const app=express()
//Middleware
app.use(bodyParser.urlencoded({extends:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname)))
//Conexion a la BBDD
const db={
    host: "localhost",
    user: "root",
    password: "",
    database: "sena_Users"
}

app.listen(3000, ()=>{
    console.log("OK")
})