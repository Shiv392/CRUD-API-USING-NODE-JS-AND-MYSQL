const express=require('express');
const bodyparser=require('body-parser');
const mysql=require('./models/db.js');
const user=require('./controller/user.js');
const cors=require('cors');
const port=8000;
const app=express();

app.use(bodyparser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send(`<h1>this is Home Page</h1>`)
})

app.use('/user',user)

app.listen(port ,()=>{
    console.log(`server started http://localhost:${port}`);
})