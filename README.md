# BamazonStorefront

## About
This application features a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm mysql package.

##MySQL Database Setup
You'll need the MySQL database on your computer to run this application, and create the Bamazon database/products table using the code from bamazon.sql. Run the code in your client (such as Workbench) to populate the database.

##Customer Interface
Using the customer interface, a user can get item IDs, names, departments, prices, and quantities for various items. The user may specify an item ID and quantity in order to make a purchase. If the desired quantity is in stock, the order fulfills (total purchase price is displayed and store database is updated). If the desired quantity is not in stock, the user receives a prompt to alter their order.

## Screenshots

![CLI](reneegrinnell.github.com/BamazonStorefront/images/purchasing.png)

![DB](reneegrinnell.github.com/BamazonStorefront/images/borg.png)