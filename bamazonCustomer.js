// display all items available for sale with ids, names, and prices
var mysql = require("mysql");
var inquirer = require("inquirer");

var amountOwed;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after connection is made to prompt the user
    showProducts();
});

// displays all items available in store, calls purchaseItem fn
function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err)
            throw err;
        console.log("*********************************************");
        console.log("\nWelcome to Bamazon, for all your Starfleet purchasing needs!\n\n************Available for Purchase************");

        for (i = 0; i < res.length; i++) {
            console.log("\nProduct ID: " + res[i].item_id +
                "\nProduct Name: " + res[i].product_name +
                "\nDepartment: " + res[i].department_name +
                "\nPrice: $" + res[i].price +
                "\nQuantity in Stock: " + res[i].stock_quantity +
                "\n")
        }
        console.log("*********************************************");
        purchaseItem();
    })
}

// prompts user to enter product ID and quantity, executes purchase assuming sufficient quantity available
function purchaseItem() {
    inquirer.prompt([{
        name: "chooseId",
        message: "Please enter the ID of your desired product: ",
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return "Oh noes! The ID you entered does not exist. Please enter a valid product ID."
        }
    }, {
        name: "chooseQuantity",
        message: "Please enter a quantity: ",
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return "Did you fall asleep in math class a little too often at the Academy? Please enter a numerical value."
        }
    }]).then(function (answer) {
        //console.log(JSON.stringify(answer));
        connection.query("SELECT * FROM products WHERE ?", {item_id:answer.chooseId}, function (err, res) {
            //console.log(JSON.stringify(res));
            if (answer.chooseQuantity > res[0].stock_quantity) {
                console.log("\nInsufficient quantity!");
                console.log("\nYour order has been cancelled.\n");
                newOrder();
            }
            else {
                amountOwed = res[0].price * answer.chooseQuantity;
                console.log("\nThank you for your order!");
                console.log("\nYou owe $" + amountOwed);
                //updates products table
                connection.query("UPDATE products SET ? Where ?", [{
                    stock_quantity: res[0].stock_quantity - answer.chooseQuantity
                }, {
                    item_id: answer.chooseId
                }], function (err, res) { });
                newOrder();
            }
        });

        // allows user to place new order or end connection
        function newOrder() {
            inquirer.prompt([{
                type: "confirm",
                name: "selection",
                message: "Do you need anything else before returning to Voyager?"
            }]).then(function (answer) {
                if (answer.selection) {
                    purchaseItem();
                }
                else {
                    console.log("Thank you for shopping at Bamazon! Live long and prosper.");
                    connection.end();
                }
            })
        }
    })
};