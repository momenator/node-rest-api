
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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.get('/', function(req, res){
	res.json({
		message: "API ONLINE!"
	});
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('REST API running on http://localhost:' + port);


