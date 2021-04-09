const express = require('express')
const cors = require('cors')
const Razorpay = require('razorpay')
const bodyParser = require('body-parser')


var app = express()
app.use(bodyParser.json())

var instance = new Razorpay({
     key_id: 'rzp_test_E2NtDVyf6BMKXm',
     key_secret: 'LxZ5myb2kxj1SI1BJdfMxbaU',
});

app.options('/order', cors()) 
app.post('/order', cors(), function (req, res, next) {
     let { amount } = req.body
     var options = {
          amount: amount*100,
          currency: "INR"
     };

     instance.orders.create(options, function(err, order) {
          if(err){
               console.log(err);
          }else{
               res.statusCode = 200
               res.json({
                    id : order.id,
                    currency: order.currency,
                    amount : order.amount
               })
          }
     })
  

})
 
app.listen(8080, function () {
  console.log('listening on port 8080')
})
