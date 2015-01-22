
// BASE SETUP
// =============================================================================

// Call the packages we need
var express 	= require('express');
var app			= express();
var bodyParser 	= require('body-parser');

// Configure app to use bodyParser()
// This will let us get data from a POST method
app.use( bodyParser.urlencoded( { extended :true } ) );
app.use( bodyParser.json() );

var port = process.env.PORT || 2500;	// set the port number

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('An API request received...');

    // next() to indicate to our application that it 
    // should continue to the other routes. This is 
    // important because our application would stop at 
    // this middleware without it.
    
    next(); 
});

// test route to make sure everything is working (accessed at GET http://localhost:2500/api)
router.get('/', function(req, res){
	res.json({
		message: "API ONLINE!"
	});
});

router.route('/items')

	// create an item ( accessed at POST http://localhost:2500/api/ )
	.post(function(req, res) {

		var item = new Item ();				// create new item instance
		item.name = req.body.name;			// set the item name

		// save the bear and check for errors
		item.save(function(err) {
			if (err) res.send(err);

			res.json({ message: 'Item ' + item.name + ' saved' });
		});
	})

	.get(function(req, res){
		Item.find(function(err, items){
			if (err) 
				res.send(err);

			res.json(items);
		});
	});

router.route('/items/:item_id')

    // get the bear with that id (accessed at GET http://localhost:2500/api/items/:item_id)
    .get(function(req, res) {
        Item.findById(req.params.item_id, function(err, item) {
            if (err)
                res.send(err);

            res.json(item);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Item.findById(req.params.item_id, function(err, item) {

            if (err)
                res.send(err);

            item.name = req.body.name;  // update the bears info

            // save the bear
            item.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'item ' + item.name +' updated!' });
            });

        });
    });

router.route('/items/name/:item_name')

    // get the bear with that id (accessed at GET http://localhost:2500/api/items/:item_id)
    .get(function(req, res) {
        Item.findOne({ 'name' : req.params.item_name }, function(err, item) {
            if (err)
                res.send(err);

            res.json(item);
        });
    });



// REGISTER OUR ROUTES 
// all of our routes will be prefixed with /api

app.use('/api', router);

// DB INITIALISATION

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rest-db'); // connect to our database

var Item 	   = require('./models/item');


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('REST API running on http://localhost:' + port);


