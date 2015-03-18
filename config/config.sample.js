function ConfigFile(){
	return {
		port: 3000,
		host: "localhost",
		mongo: "Mongo URL"
	}
}

module.exports = new ConfigFile();