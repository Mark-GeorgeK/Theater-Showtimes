const express = require('express') ;
const bodyparser = require('body-parser') ;
const path = require('path') ;
const app = express() ;

var Publishable_Key = 'pk_test_51KzoemLSmsBfcMZunWG2XkZoKpm5Xh6lKMmDD6E9FliDVE7Hf5osXfegGmygsmx8dE33YbvLv8OZzlutKpEEY9Iz00SAuwZ2yT'
var Secret_Key = 'sk_test_51KzoemLSmsBfcMZuUijGxLzejwv4lmLuvqi4Qy8bk2ru2R2kaLvo4w9rq1snReIeH1R52TR4QM5eYOO0Zquw0HoW00af5qOHgp'

const stripe = require('stripe')(Secret_Key) 


app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'));

function paymenthandle(req, res){ 
    
    res.render('payment', { 
    key: Publishable_Key 
    }) 
}

module.exports=paymenthandle;
