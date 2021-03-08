const braintree = require('./paymentGateway/braintree.js')
const paypal = require('./paymentGateway/paypal.js')
const db = require('./database/mysql.js')
const paymentGateways = JSON.parse(process.env.paymentGateways)
function transaction(paymentGateway, request) {

    return new Promise(async (resolve, reject) => {
        try {
            if(request.price && request.creditCard && request.expirationYear && request.expirationMonth && request.cvv){
            if (paymentGateways.includes(paymentGateway)) {
                let gatewayResponse
                if (paymentGateway === 'braintree') {
                    gatewayResponse = await braintree.transaction(request)
                } else if (paymentGateway === 'paypal') {
                    gatewayResponse = await paypal.transaction(request)
                }
                if(gatewayResponse.result === true && process.env.persistTransactions === 'true'){
                    await db.storeTransaction(paymentGateway,gatewayResponse,request);
                }
                resolve(gatewayResponse);

            }
            else {
                reject('Payment Gateway Not Supported')
            }}
            else{
                reject('Invalid Input')
            }
        }
        catch (error) {
            reject(error)
        }

    })

}
module.exports.transaction = transaction;
