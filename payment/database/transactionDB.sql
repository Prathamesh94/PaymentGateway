CREATE DATABASE transactions_db;
use transactions_db;
CREATE TABLE transactions(
transaction_id int(11) NOT NULL AUTO_INCREMENT,
customer_name varchar(255) NOT NULL,
paymentGateway varchar(255) NOT NULL,
gatewayResponse mediumtext,
price float(11) NOT NULL,
currency varchar(255) NOT NULL,
PRIMARY KEY(transaction_id));