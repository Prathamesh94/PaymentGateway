const expect = require('chai').expect; 
const payments = require('./payment/payment.js')
const req = {
  price: '12',
  currency: 'HKD',
  customer_full_name: 'Prathamesh Mhatre',
  payment_method_nonce: '',
  'holder-name': 'Prathamesh Mhatre',
  creditCard: '4111111111111111',
  cvv: '111',
  expirationMonth: '2',
  expirationYear: '2020',
  pay: 'Pay'
}
//amex
//storedata
//usd
//eur
//hkd
describe("Testing Payment Gateway Library", () => { 
    it("When Currency is HKD trigger braintree Payment Gateway", async () => { 
        const paymentGateway = 'braintree'
      expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(true); 
    });
    it("When Currency is THB trigger braintree Payment Gateway", async () => { 
      const paymentGateway = 'braintree'
      req.price = '13'
      req.currency = 'THB'
    expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(true); 
  });
  it("When Currency is SGD trigger braintree Payment Gateway", async () => { 
    const paymentGateway = 'braintree'
    req.price = '11'
    req.currency = 'SGD'
  expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(true); 
});
    it("When CVV is Invalid", async () => { 
      const paymentGateway = 'braintree'
      req.cvv = '11'
    expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(false); 
  }); 
    it("When Currency is USD trigger paypal Payment Gateway", async () => { 
      const paymentGateway = 'paypal'
      req.creditCard = '4032031500811145'
      req.currency = 'USD'
      req.expirationMonth='3'
      req.expirationYear='2024'
      req.cvv = '111'
    expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(true); 
  });
  it("When Currency is EUR trigger paypal Payment Gateway", async () => { 
    const paymentGateway = 'paypal'
    req.creditCard = '4032031500811145'
    req.currency = 'EUR'
    req.expirationMonth='3'
    req.expirationYear='2024'
    req.cvv = '111'
  expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(true); 
});
it("When Currency is AUD trigger paypal Payment Gateway", async () => { 
  const paymentGateway = 'paypal'
  req.creditCard = '4032031500811145'
  req.currency = 'AUD'
  req.expirationMonth='3'
  req.expirationYear='2024'
  req.cvv = '111'
expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(true); 
});
  it("When Credit Card type is AMEX and currency is USD trigger paypal Payment Gateway", async () => { 
    const paymentGateway = 'paypal'
    req.creditCard = '379819373497052'
    req.currency = 'USD'
    req.expirationMonth='11'
    req.expirationYear='2025'
    req.cvv = '1498'
  expect(await payments.transaction(paymentGateway,req)).to.have.property('result').to.equal(true); 
}); 

 }); 