DROP TABLE IF EXISTS orders;
 
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cust_name VARCHAR(250) NOT NULL,
  subtotal DOUBLE,
);