describe("User Suite", function(){
	var User = require("../app/models/user");
	var mongoose = require("mongoose");
	var config = require("../config/config");
	var newUser;
	var should = require("should");

	before(function(){
		mongoose.connect(config.mongo);
	})

	beforeEach(function(){
		newUser = new User({
			username: "Kreative",
			password: "Johnny50"
		});
	})

	after(function(done){
		User.remove({username: newUser.username}, function(err, removed){
			if(!err){
				done();
			}
		});
	})

	describe("User", function(){
		it("is a new user", function(done){
			should(newUser).exist;
			done();
		})

		describe("#Password", function(){
			it("is too short", function(done){
				newUser.password = "Johnny7"
				newUser.save(function(err, user, numSaved){
					err.should.be.an.Error;
					done();
				})
			})

			it("doesn't have a number", function(done){
				newUser.password = "Johnnybe"
				newUser.save(function(err, user, numSaved){
					err.should.be.an.Error;
					done();
				})
			})

			it("doesn't have a capital", function(done){
				newUser.password = "johnny8e"
				newUser.save(function(err, user, numSaved){
					err.should.be.an.Error;
					done();
				})
			})
		})		
	})

	it("saves a user", function(done){
		newUser.save(function(err, user, numSaved){
			if(err){
				console.error(err);
			}

			should(newUser).exist;
			done();
		})
	})

	describe("#findUser()", function(){
		it("gets user", function(done){
			User.findUser("Kreative", "Johnny50", function(err, user){
				if(err){
					console.error(err);
				}
				should(user).exist;
				done();
			})
		})

		it("is the incorrect password", function(done){
			User.findUser("Kreative", "Johnny0", function(err, user){
				if(err){
					console.error(err);
				}
				should(user).not.exist;
				should(err).have.an.Error;
				err.message.should.equal("Username/Password doesn't Match");
				done();
			})
		})
	})
	
})