var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: checkPassword,
			msg: "Password must be atleast 8 characters, contain a capital and conatin a number"
		}
	}
});

userSchema.pre("save", function(next){
	this.password = bcrypt.hashSync(this.password, 10);
	next();
})

userSchema.static("findUser", function(username, password, callback){
	var checkHash = function(err, retrievedUser){

		if(err){
			callback(err);
			return;
		}

		if(!bcrypt.compareSync(password, retrievedUser.password)){
			callback(new Error("Username/Password doesn't Match"));
			return;
		}

		callback(null, retrievedUser)
	}
	
	this.findOne({
		username: username
	})
	.exec(checkHash);
})

function checkPassword(pass){
	var hasNumber = /\d/gi;
	var hasCapital = /[A-Z]/gm;

	if(pass.length < 8){
		return false;
	}

	if(!pass.match(hasNumber)){
		return false;
	}

	if(!pass.match(hasCapital)){
		return false;
	}

	return true;
}

var model = mongoose.model("UserModel", userSchema);

module.exports = model;