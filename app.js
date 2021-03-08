const express = require('express')
const app = express()
const port = process.argv[2]
const bodyParser = require('body-parser');
const payments = require('./payment/payment.js')
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/payment', async (req, res,next) => {
    //American Express Credit Cards Starts with 34 or 37
    console.log(req.body)
    const isAMEX = (req.body.creditCard.startsWith('34') || req.body.creditCard.startsWith('37')) ? true : false
    let gatewayResponse
    if (req.body.currency != 'USD' && isAMEX) {
        next(new Error('CurrencyNotSupportedwithAMEZ')) // AMEX is possible to use only for USD
    }
    else {
        try{
        paymentGateway = (req.body.currency == 'USD' || req.body.currency == 'EUR' || req.body.currency == 'AUD') ? 'paypal':'braintree'
        gatewayResponse = await payments.transaction(paymentGateway, req.body)
        if (gatewayResponse.result === true) {
            res.send({success:true})
        }else{
            res.send({success:false,reason:gatewayResponse.reason})
        }}catch(error){
            next(error)
            
        }
    }
})
app.use(function (err, req, res, next) {
    if (err.message == 'CurrencyNotSupportedwithAMEZ') {
        const error = { success: false, reason: 'American Express card is Supported only for USD'}
        res.send(error)
    }else{
        res.send({success:false,reason:'Internal Server Error'})
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})