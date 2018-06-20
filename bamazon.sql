-- Drops the bamazon if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect bamazon --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
  -- Makes a string column called "item_id" which cannot contain null --
  item_id INTEGER(7) NOT NULL,
  -- Makes a sting column called "product_name" --
  product_name VARCHAR(100) NOT NULL,
  -- Makes a sting column called "department_name" --
  department_name VARCHAR(30),
  -- Makes an numeric column called "price" --
  price INTEGER(10) NOT NULL,
  -- Makes an numeric column called "stock_quantity" --
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5830395, "Echo Spot", "Smart Home", 129.99, 98);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4920395, "Ring Doorbell", "Smart Home", 99.99, 88);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5930423, "Xbox One X 1TB Console", "Entertainment", 484.75, 57);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3020943, "Playstation 4 Pro 1TB Console", "Entertainment", 390.90, 34);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7949324, "Beats Studio 3 Wireless Headphones Matte Black", "Portable Electronics", 249.00, 75);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4323456, "Bose QuietComfort 35 Wireless Headphones Black", "Portable Electronics", 349.99, 56);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6950334, "Dyson V7 Cordless Vacuum Cleaner", "Small Appliances", 299.00, 35);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4920576, "Keurig K55 Coffee Maker", "Small Appliances", 96.70, 79);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9584720, "Fire HD 8 Tablet 16GB Black", "Portable Electronics", 79.99, 65);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4930684, "Apple iPad with WiFi 32GB Gold", "Portable Electronics", 297.50, 43);





