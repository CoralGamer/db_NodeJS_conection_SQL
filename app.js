const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const mysql=require('mysql2/promise')
const session=require('express-session')
const app=express()
app.use(session({
    secret:'Secreto',
    resave:false,
    saveUninitialized: true,
}))
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
    try{
        const conect= await mysql.createConnection(db)
        const [row]= await conect.execute('SELECT * FROM sena WHERE Correo=? AND Pass=?', [correo,pass])
        console.log(row)

        if(row.length>0){
            req.session.Nombre=row[0].Nombre
            req.session.nombre_Usuario=row[0].Nombre
            res.locals.nombre_Usuario=row[0].Nombre
            res.sendFile(path.join(__dirname,'usuario.html'))
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
    }
    catch(err){
        console.error(err)
    }
})
app.post('/registro',async (req,res)=>{
    const {correo,nombre,tipoID,documento,pass}=req.body
    try{
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
    }
    catch(err){
        console.error(err)
    }
})

app.get('/obtener-usuario',(req,res)=>{
    const usuario=req.session.nombre_Usuario
    if(usuario){
        res.json({nombre:usuario})
    }else{
        res.status(401).send("No se encontro el nombre")
    }
})
app.post('/cerrar', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error('No se pudo')
            res.status(500).send('Error')
        }else{
            res.status(201).send("Cerrado")
        }
    })
})

app.listen(3000, ()=>{
    console.log("OK")
})