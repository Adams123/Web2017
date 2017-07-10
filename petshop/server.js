// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var path = require('path')
var bodyParser = require('body-parser');
var nano = require('nano')('http://localhost:5984');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
var petchoop = nano.db.use('petchoop');

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here

router.route('/products')
    .post((req, res) => {
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
            if (err) {
                console.log("Error", err.message);
                return;
            }
            res.json(body);
            return;
        });
    }).get((req, res) => {
        petchoop.view('products', 'allProducts', function (err, body) {
            if (!err) {
                console.log({
                    'result': body['rows']
                })
                res.json({
                    'products': body['rows']
                })
            } else {
                console.log("Error", err.message);
                return;
            }
        });
    });

 	router.route('/services')
	.post((req, res) => {
	    let s = {};
	    s.name = req.body.name;
	    s.stock = parseInt(req.body.stock);
	    s.sold = parseInt(req.body.sold);
	    s.price = parseFloat(req.body.price);
	    s.description = req.body.description;
	    petchoop.insert({
	        type: 'service',
	        name: s.name,
	        price: s.price,
	        description: s.description
	    }, (err, body, header) => {
	        if (err) {
	            console.log("Error", err.message);
	            return;
	        }
	        res.json(body);
	        return;
	    });
	}).get((req, res) => {
	    petchoop.view('services', 'allServices', function (err, body) {
	        if (!err) {
	            console.log({
	                'result': body['rows']
	            })
	            res.json({
	                'services': body['rows']
	            })
	        } else {
	            console.log("Error", err.message);
	            return;
	        }
	    });
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

// CREATE DATABASE AND POPULATE
var petchoop;
nano.db.destroy("petchoop", function(){
	nano.db.create("petchoop", function(){
		petchoop = nano.db.use("petchoop");
		console.log("Database created");
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

		petchoop.insert({
			type: 'service',
			name: 'Banho',
			price: 24.99,
			description: "Banho com shampoo"
		}, (err, body, header) => {
			if(err){
				console.log("Error: ", err.message);
				return;
			}
		  return;
		});

		petchoop.insert({
			type: 'service',
			name: 'Tosa',
			price: 24.99,
			description: "Tosa de pêlos"
		}, (err, body, header) => {
			if(err){
				console.log("Error: ", err.message);
				return;
			}
		  return;
		});

		petchoop.insert({
			type: 'service',
			name: 'Hotel',
			price: 30.99,
			description: "Pernoite e cuidados para animais que precisam de um lar esporádico"
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
		    { "allServices":
		    	{ "map": function(doc) {
		    			if(doc.type){
								if(doc.type=='service'){
									emit(doc._id, doc);
								}
							}
		    		}
		    	}
		    }
		  },'_design/services', function (error, response) {
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

	});
});
// START THE SERVER
// =============================================================================
var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})
