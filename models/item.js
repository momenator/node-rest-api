var mongoose 	= require('mongoose');
var Schema	 	= mongoose.Schema;

// DB ENTITY DEFINITION
// Define your db entity here...
var ItemSchema  = new Schema({
	name : String
});

module.exports  = mongoose.model('Item', ItemSchema);

	