// Requiring dependencies.
var mysql = require('mysql');
var password = require('./password.js');
var prompt = require('prompt');

// Setting up the connection to mySQL.
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'products'
});

// Initializing the mySQL connection and prompt.
connection.connect();
prompt.start();

// Selecting everything from the products table.
connection.query('SELECT * FROM products', function(err, rows) {
	if (err) throw err;
	// Log all the items for sale to the console.
	for (var i = 0; i < rows.length; i++) {
		console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price);
	};
	var schema = {
		properties: {
			itemid: {
				description: 'What is the ID of the product you want?'
			},
			quantity: {
				description: 'How many would you like?'
			}
		}
	}
	// Ask the user what they want to buy and how much.
	prompt.get(schema, function(err, result) {
		// If the user wants more than in stock quantity tell them we don't have enough.
		if (rows[result.itemid - 1].StockQuantity < result.quantity) {
			console.log("Insufficient Quantity");
		// If not enough stock
		} else {
			// Total the amount for the user.
			var orderPrice = (rows[result.itemid-1].Price * result.quantity);
			var department = rows[result.itemid-1].DepartmentName;
			console.log("Order confirmation");
			console.log("Your order costs: $" + orderPrice);
			console.log("Thank you!");
			
			// Update the stock for the item.
			var newQuantity = ( rows[result.itemid - 1].StockQuantity - result.quantity);
			connection.query('UPDATE products SET StockQuantity=' + newQuantity + ' WHERE ItemID=' + result.itemid + ';', function(err, res) {
				if (err) throw err;
			});

		};
	});
});