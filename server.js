function APIServer(){
	this.init();
}

APIServer.prototype.init = function() {
	this.express = require("express");
	this.app = this.express();
	this.bodyParser = require("body-parser");
	this.http = require("http");
	this.config = require("./config/config.js");
	this.app.use(this.bodyParser.json());
	this.app.use(this.bodyParser.urlencoded({
		extended: false
	}));

	this.userRoutes = require("./app/controllers/routes/user-routes")(this.express.Router());

	this.app.use("/user", this.userRoutes);	
};

APIServer.prototype.listen = function(port, host) {
	var self = this;

	port = port || self.config.port || 3000;
	host = host || self.config.host ||  "localhost";

	self.app.listen(port, host, function(){
		console.log("Host: " + host);
		console.log("Port: " + port);
		console.log("Running");
	})
};

var server = new APIServer();
server.listen(3000);