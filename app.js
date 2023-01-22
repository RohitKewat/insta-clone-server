
const express = require('express');
const cors = require('cors')

const server = require('./connention/conncection');
const router = require('./Routes/postroutes')
app = express()
app.use(cors());
server()
const port = 8000 || process.env.port


app.use(router)
app.get('/',(req,res)=>{

    res.send("This is Home ");

})


app.listen(port,()=>{console.log(`server is running at ${port}`)}) ;