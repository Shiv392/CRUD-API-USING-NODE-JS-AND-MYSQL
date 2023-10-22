const express=require('express');
const router=express.Router();
const mysql=require('../models/db.js');

router.get('/',(req,res)=>{
    console.log('get request')
    mysql.query('select * from user',(err,result)=>{
   if(err){
    res.status(502).json({
        success:false,user:[],message:'something went wrong'
    })
   }
   else{
    console.log('user',result);
    res.json({
        success:true,user:result
    })
   }
    })
})

router.post('/adduser',(req,res)=>{
    const {name,email,city,age}=req.body;
    mysql.query(`SELECT * FROM user where email=?`,email,(err,result)=>{
        if(err){
            console.log(err);
            return res.json({
                success:false,message:'could not add user'
            })
        }
       else if(result.length>0){
        return res.json({
            success:false,message:'Email is already Registerd'
        })
       }
       else{
        mysql.query(`INSERT INTO user(name,email,city,age) VALUES (?, ?, ?, ?)`,[name,email,city,age],(err,result)=>{
            if(err){
                console.log(err);
                res.json({
                    success:false,message:'could not add new user'
                })
            }
            else{
                console.log('new user has been added to database');
                res.json({
                    success:true,message:'User has been added to database',user:result
                })
            }
        })
       }
    })
   
})

//delete api
router.delete('/deleteuser/:id',(req,res)=>{
    const id=req.params.id;
  mysql.query(`SELECT * FROM user WHERE id=?`,id,(err,result)=>{
    if(err){
        res.status(502).json({
            success:false,message:'could delete user'
        })
    }
    else if(result.length==0){
        return res.json({
            success:false,
            message:'user is not present'
        })
    }
    else{
        mysql.query(`DELETE FROM user WHERE id=?`,id,(err,result)=>{
            if(err){
                console.log(err);
                res.json({
                    success:false,message:'could not delete user'
                })
            }
            else{
                res.json({
                    success:true,message:'user has been deleted'
                })
            }
        })
    }
  })
})

//put request
router.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    const {name,email,city,age}=req.body;
    mysql.query(`SELECT * FROM user where id=?`,id,(err,result)=>{
        if(err){
            res.json({
                success:false,message:'something went wrong'
            })
        }
        else if(result.length==0){
            res.json({
                success:false,message:"User doesn't exist"
            })
        }
        else{
            mysql.query(`UPDATE user SET name = ? , email = ? , city = ? , age = ? WHERE id = ?`,[name,email,city,age,id],(err,result)=>{
            if(err){
                res.status(502).json({
                    success:false,
                    message:'could not update the user'
                })
            }
            else{
                res.json({
                    success:true,
                    message:'User has been updated'
                })
            }
            })
        }
    })
})

module.exports=router;