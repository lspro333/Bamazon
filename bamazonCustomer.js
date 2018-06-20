// Requiring dependencies.
var mysql = require('mysql');
var inquirer = require('inquirer');

// Setting up the connection to mySQL.
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

// Initializing the mySQL connection and prompt.
connection.connect(function(err){
	console.log("Connected as id: "+connection.threadId);
	displayInventory();
})

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Error: Please enter a whole, non-zero number.';
	}
}

function displayInventory() {

	// Make the db query
	connection.query("SELECT * FROM products", function(err, data) {
		if (err) throw err;

		console.log("Existing Inventory: ");
		console.log("...................");

		var inventoryList = '';
		for (var i = 0; i < data.length; i++) {
			inventoryList = '';
			inventoryList += 'Item ID: ' + data[i].item_id + '  //  ';
			inventoryList += 'Product Name: ' + data[i].product_name + '  //  ';
			inventoryList += 'Department: ' + data[i].department_name + '  //  ';
			inventoryList += 'Price: $' + data[i].price + '\n';

			console.log(inventoryList);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	// Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
};

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		connection.query('SELECT * FROM products WHERE ?', {item_id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data array will be empty
			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];
				
				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Good news, the product you requested is in stock and your order is placed!');

					// Updating query string
					var updateInventory = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					// Update the inventory
					connection.query(updateInventory, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed and your total is $' + productData.price * quantity);
						console.log('Thank you for your order!');
						console.log("---------------------------------------------------------------------");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock and your order cannot be placed.');
					console.log('Please modify your order.');
					console.log("---------------------------------------------------------------------");

					displayInventory();
				}
			}
		})
	})
};

