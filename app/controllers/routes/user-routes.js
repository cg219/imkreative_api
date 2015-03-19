var User = require("../../models/user");
var mongoose = require("mongoose");
var config = require("../config/config");


function UserRoute (router) {

	router.post("login", function(req, res){
		var username = req.body.username;
		var password = req.body.password;

		mongoose.connect(config.mongo);

		User.findUser(username, password, function(err, user){
			if(err){

			}

			res.json(user);
			mongoose.disconnect();
		})
	})

	router.post("register", function(req, res){
		var username = req.body.username;
		var password = req.body.password;

		mongoose.connect(config.mongo);

		User.findOne({
			username: username
		}, function(err, user){
			if(user.length > 0){
				req.json({});
				return;
			}

			var newUser = User({
				username: username,
				password: password
			})

			newUser.save(function(err, user, updated){
				if(err){
					req.json({})
					return;
				}

				req.json(user);
			})
		})
	})
}