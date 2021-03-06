var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String,
	reg_time: {type: Date, default: Date.now},
	gData: {type: String, default: "Blank"}
}),

User = mongoose.model('User', userSchema);

module.exports = User;