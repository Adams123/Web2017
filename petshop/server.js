// Adams Vietro Codignotto da Silva - 6791943
// Antônio Pedro Lavezzo Mazzarolo - 8626232
// Gustavo Dutra Santana - 8532040
// Veronica Vannini - 8517369

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var path = require('path')
var bodyParser = require('body-parser');
var nano = require('nano')('http://localhost:5984');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var petchoop = nano.db.use('petchoop');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here

router.route('/products')
.post((req, res) =>{
	let p = {};
	p.name = req.body.name;
	p.stock = parseInt(req.body.stock);
	p.sold = parseInt(req.body.sold);
	p.price = parseFloat(req.body.price);
	p.description = req.body.description;
	petchoop.insert({
		type: 'product',
		name: p.name,
		stock: p.stock,
		sold: p.sold,
		price: p.price,
		description: p.description
	}, (err, body, header) => {
		if(err){
			console.log("Deu ruim", err.message);
			return;
		}
		console.log('you have inserted the product.');
    console.log(body);
    res.json(body);   
    return;
	});
}).get((req, res) => {
	console.log("Making a get");
	petchoop.view('products','allProducts',function(err, body) {
	  if (!err) {
	  	console.log({'result': body['rows']})
	  	res.json({'products': body['rows']})
	  }else{
	  	console.log("Error: ", err.message);
	  	return;
	  }
	});
});


router.route('/products/:product_id').get((req,res) => {
	let param = req.params.product_id
	console.log("Trying to fetch product with id "+ param)
	petchoop.get(param, (err, body) => {
		if(!err){
			res.json(body)
			return
		}

		console.log("Not finded")
		res.json("{}")
		return;
	})
});

router.route('/login')
.get((req, res) => {
	petchoop.view('users','allUsers',function(err, body) {
	  if (!err) {
	  	console.log({'result': body['rows']})
	  	res.json({'users': body['rows']})
	  }else{
	  	console.log("Error: ", err.message);
	  	return;
	  }
	});
});

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

nano.db.create("petchoop");
console.log("Database created");

var petchoop = nano.db.use("petchoop");

console.log("Creating products");
petchoop.insert({
	type: 'product',
	name: 'Coleira',
	stock: 10,
	sold: 0,
	price: 23.90,
	description: "Coleira canina anti-carrapatos"
}, (err, body, header) => {
	if(err){
		console.log("Error: ", err.message);
		return;
	}
  return;
});

petchoop.insert({
	type: 'product',
	name: 'Shampoo',
	stock: 15,
	sold: 0,
	price: 14.90,
	description: "Shampoo canino"
}, (err, body, header) => {
	if(err){
		console.log("Error: ", err.message);
		return;
	}
  return;
});

petchoop.insert({
	type: 'product',
	name: 'Focinheira',
	stock: 5,
	sold: 0,
	price: 17.00,
	description: "Focinheira para cachorros"
}, (err, body, header) => {
	if(err){
		console.log("Error: ", err.message);
		return;
	}
  return;
});

console.log("Creating admin");
petchoop.insert({
	type: 'user',
	login: 'admin',
	password: "admin"
}, (err, body, header) => {
	if(err){
		console.log("Error: ", err.message);
		return;
	}
  return;
});

console.log("Creating views");
petchoop.insert({ 
		"views": 
    { "allProducts": 
    	{ "map": function(doc) {
    			if(doc.type){
						if(doc.type=='product'){
							emit(doc._id, doc);
						}
					}
    		} 
    	} 
    }
  },'_design/products', function (error, response) {
    console.log("View created");
});	

petchoop.insert({ 
		"views": 
    { "allUsers": 
    	{ "map": function(doc) {
    			if(doc.type){
						if(doc.type=='user'){
							emit(doc._id, doc);
						}
					}
    		} 
    	} 
    }
  },'_design/users', function (error, response) {
    console.log("View created");
});

// START THE SERVER
// =============================================================================
var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})