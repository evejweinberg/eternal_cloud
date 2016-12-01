var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var personSchema = new Schema({
	name: String,
	imageUrl: String,
	slug : { type: String, lowercase: true, required: true, unique: true },

	philanthropy: Number,
	career: Boolean,
	intelligence: String,
	activism: String,
	percentIncome: Number,
	score: Number,
	dateAdded : { type: Date, default: Date.now },
	facebook: {
		default: null,
		type: Object
	}
})

personSchema.virtual('hasFacebook').get(function(){
	console.log('asked Facebook')
	return true ? this.facebook : false;
});

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Person',personSchema);
