const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const mysql=require('mysql2/promise')
const session=require('express-session')
const { connect } = require('http2')
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
    database: "sena_users"
}

app.post('/iniciar',async (req,res)=>{
    const {correo, pass}=req.body
    const conect= await mysql.createConnection(db)
    const [row]= await conect.execute('SELECT * FROM sena WHERE Correo=? AND Pass=?', [correo,pass])
    console.log(row)
    if(row.length>0){
        res.status(201).send("INGRESASTE A NUESTRA INTRANET")
    }else{
        res.status(401).send(`
            <script>
                window.onload=function(){
                    alert('Usuario no Registrado')
                    window.location.href='/registro.html'
                }
            </script>
            `)
    }
    await conect.end()
})
app.post('/registro',async (req,res)=>{
    const {correo,nombre,tipoID,documento,pass}=req.body
    console.log(correo,nombre,tipoID,documento,pass)
    const conect= await mysql.createConnection(db)
    const [row]= await conect.execute(' INSERT INTO sena (Correo, Nombre, TipoID, Documento, Pass) VALUES (?,?,?,?,?)', [correo,nombre,tipoID,documento,pass])
    if(row.length<0){
        res.status(401).send("Registra un usuario valido")
    }else{
        res.status(201).send(`
            <script>
                window.onload=function(){
                    alert('El usuario ha sido registrado Exitosamente')
                    window.location.href='/iniciar.html'
                }
            </script>
            `)
    }
    await conect.end()
})

app.listen(3000, ()=>{
    console.log("OK")
})