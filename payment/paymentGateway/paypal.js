require('dotenv').config('../../.env')
const querystring = require('querystring');
const fetch = require('request');
function transaction(request) {

    return new Promise(async (resolve, reject) => {
        const data = request;
        //console.log(data.expirationMonth + data.expirationYear)
        try {
            var form = {
                VERSION: process.env.paypalVersion,
                SIGNATURE: process.env.paypalSignature,
                CURRENCYCODE: data.currency,
                USER: process.env.paypalUsername,
                PWD: process.env.paypalPassword,
                METHOD: 'DoDirectPayment',
                PAYMENTACTION: 'Sale',
                AMT: data.price,
                ACCT: data.creditCard,
                EXPDATE: data.expirationMonth + data.expirationYear,
                CVV2: data.cvv

            };
            var formData = querystring.stringify(form);
            //console.log(formData)
            var contentLength = formData.length;
            fetch({
                headers: {
                    'Content-Length': contentLength,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: process.env.paypalurl,
                body: formData,
                method: 'POST'
            }, function (err, res, body) {
                if (err) throw err
                //console.log(body)
                const gatewayResponse = querystring.parse(body);
                if (gatewayResponse.ACK === 'Success') {
                    resolve({ result: true, data: gatewayResponse })
                }
                else {
                    console.log(gatewayResponse)
                    resolve({ result: false, reason: gatewayResponse.L_LONGMESSAGE0, data: gatewayResponse })
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}
module.exports.transaction = transaction;