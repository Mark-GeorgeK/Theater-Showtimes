const express = require('express');
const app = express() ;
const path = require('path'); 
const router = express.Router();
//app.set('view engine','ejs');
//app.use(express.static("./public"));
function payhandle(req,res){
  
   res.render('pay.ejs');
}


module.exports=payhandle;