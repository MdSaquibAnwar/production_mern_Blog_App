const express = require('express')
const cors = require('cors')
const morgan= require('morgan')
const colors =require('colors')
const dotenv = require('dotenv')
const connectdb = require('./config/db')
// const path =  require('path')


//env config
dotenv.config()

// router import 
const userRoutes = require('./routes/userRoutes')
const blogRoutes =require('./routes/blogRotes')

// mogodb connection  
connectdb();

//rest object 
const app = express()

// middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.get("/test", async (req,res)=>{
    res.send("testing")
})
// app.use(express.static(path.join(__dirname, './client/build')))
// routes
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes)

// //  rest api
// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'))
// })
//port
const PORT =process.env.PORT || 4000
//listen
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mpde port ${PORT} `.bgCyan.white)
})
