const express = require('express');
const app = express() ;
const path = require('path'); 
const router = express.Router();
//app.set('view engine','ejs');
//app.use(express.static("./public"));
function seatshandle(req,res){
  
   res.render('seats.ejs');
}


module.exports=seatshandle;
//app.use('/',router);
//app.listen(process.env.port||3000);
//console.log('running');