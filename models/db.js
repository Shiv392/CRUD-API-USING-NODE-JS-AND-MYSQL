const express=require('express');
const mysql=require('mysql');

const mysqlconnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Shiv@3923',
    database:'node_connecting_mysql'
})
mysqlconnection.connect((err)=>{
    if(err) console.log('error while connection to database',err);
    else console.log('mysql database connection successfull');
})
module.exports=mysqlconnection;