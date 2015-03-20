var User = require("../../models/user");
var mongoose = require("mongoose");
var config = require("../../../config/config");

module.exports = UserRoute;

function UserRoute (router) {

	router.post("/login", function(req, res){
		var username = req.body.username;
		var password = req.body.password;

		mongoose.connect(config.mongo);

		User.findUser(username, password, function(err, user){
			if(err){
				res.json({
					error: true,
					message: "Something Went Wrong"
				});
				mongoose.disconnect();
				return;
			}

			res.json(user);
			mongoose.disconnect();
		})
	})

	router.post("/register", function(req, res){
		console.log("Hit Register");

		var username = req.body.username;
		var password = req.body.password;

		mongoose.connect(config.mongo);

		User.findOne({
			username: username
		}, function(err, user){
			if(user){
				res.json({});
				mongoose.disconnect();
				return;
			}

			var newUser = User({
				username: username,
				password: password
			})

			newUser.save(function(err, user, updated){
				mongoose.disconnect();

				if(err){
					res.json({})
					return;
				}

				console.log(user);
				res.json(user);
			})
		})
	})

	return router;
}