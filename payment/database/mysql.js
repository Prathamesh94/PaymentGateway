require('dotenv').config('../../.env')
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbname
});
if(process.env.persistTransactions === 'true'){
  connection.connect();
}
function storeTransaction(paymentGateway, gatewayResponse, orderDetails) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO transactions(paymentGateway,gatewayResponse,customer_name,price,currency) VALUES('${paymentGateway}','${JSON.stringify(gatewayResponse)}','${orderDetails.customer_full_name}','${orderDetails.price}','${orderDetails.currency}')`, function (error, results, fields) {
      if (error) reject(error);
      resolve(results)
    });
  })
}
exports.storeTransaction = storeTransaction