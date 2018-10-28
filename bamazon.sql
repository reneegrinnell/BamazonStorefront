DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Janeway's Blend Whole-Bean Coffee", "Grocery", 12.00, 500),
    ("Premium Tricorder", "Electronics", 85.50, 75),
    ("Starfleet Issue Combadge", "Electronics", 91.77, 400),
    ("First Harvest Talaxian Leola Root", "Grocery", 6.66, 7899),
    ("Antacids for Leola Root-Induced Digestive Upset", "Pharmacy", 5.99, 212),
    ("Kal-Toh Vulcan Board Game", "Entertainment", 200.00, 25),
    ("Captain's Best Volumizing Spray for Commanding Updos", "Pharmacy", 7.44, 350),
    ("Tommy (Paras) Bahama Hawaiian Holodeck Shirt", "Apparel", 39.99, 78),
    ("Borg Regeneration Alcove", "Electronics", 7999.79, 3),
    ("Regulation Starfleet Uniform", "Apparel", 125.99, 64);