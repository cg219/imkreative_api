describe("Register and Login", function(){
	var request = require("request");
	var should = require("should");
	var UserModel = require("../app/models/user");
	var mongoose = require("mongoose");
	var config = require("../config/config");
	var user = {
		username: "KreativeM",
		password: "MenteMan99"
	}

	after(function(done){
		var newUser = new UserModel({
			username: user.username,
			password: user.password
		});

		mongoose.connect(config.mongo);

		UserModel.remove({username: newUser.username}, function(err, removed){
			if(!err){
				mongoose.disconnect();
				done();
			}
		});
	})

	describe("#register()", function(){
		it("registers a new user", function(done){
			request
				.post("http://localhost:3000/user/register", function(err, res, body){
					body.should.exist;
					body.should.not.have.ownProperty("error");
					done();
				})
				.json({
					username: user.username,
					password: user.password
				})
		})
	})

	describe("#login()", function(){
		it("logs a user in", function(done){
			request
				.post("http://localhost:3000/user/login", function(err, res, body){
					body.should.exist;
					body.should.not.have.ownProperty("error");
					done();
				})
				.json({
					username: user.username,
					password: user.password
				})
		})
	})
})