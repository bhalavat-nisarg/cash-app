CREATE DATABASE cash;

USE cash;

CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    mobile INT,
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zipcode INT NOT NULL
);

CREATE TABLE transactions (
    tid INT AUTO_INCREMENT PRIMARY KEY,
    txn_date DATE NOT NULL,
    txn_month VARCHAR(8) NOT NULL,
    txn_type VARCHAR(45),
    status ENUM ('Paid', 'Unpaid') NOT NULL,
    base_amount DECIMAL(12,2) DEFAULT 0,
    tax DECIMAL(12,2) DEFAULT 0,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    payment_mode ENUM ('Cash', 'Cheque', 'Credit Card', 'Debit Card', 'Demand Draft') NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(uid)
);
