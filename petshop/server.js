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
    console.log('Something is happening.');
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
        petchoop.view('products', 'allProducts', function (err, body) {
            if (!err) {
                console.log({
                    'result': body['rows']
                })
                res.json({
                    'products': body['rows']
                })
            } else {
                console.log("Deu ruim", err.message);
                return;
            }
        });
    });

router.route('/products/:product_id').get((req, res) => {
    let param = req.params.product_id
    console.log("Trying to fetch product with id " + param)
    petchoop.get(param, (err, body) => {
        if (!err) {
            res.json(body)
            return
        }

        console.log("Not found")
        res.json("{}")
        return;
    })
});

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})
