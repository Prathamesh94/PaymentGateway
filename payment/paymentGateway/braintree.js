require('dotenv').config('../../.env')
var braintree = require('braintree');
function transaction(request) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = request;
            const gateway = new braintree.BraintreeGateway({
                "environment": braintree.Environment.Sandbox,
                "merchantId": process.env.braintreeMerchantID,
                "publicKey": process.env.braintreePublicKey,
                "privateKey": process.env.braintreePrivateKey
            });
            let gatewayResponse = await gateway.transaction.sale({
                amount: data.price,
                paymentMethodNonce: data.nonce,
                creditCard: {
                    number: data.creditCard,
                    expirationMonth: data.expirationMonth,
                    expirationYear: data.expirationYear,
                    cvv: data.cvv
                }
            });
            //console.log(gatewayResponse);
            if (gatewayResponse.success === true) {
                resolve({ result: true, data: gatewayResponse })
            }
            else {
                console.log(gatewayResponse);
                resolve({ result: false,reason:gatewayResponse.message, data: gatewayResponse })
            }
        }
        catch (error) {
            reject(error)
        }

    })
}
module.exports.transaction = transaction;