function ConfigFile(){
	return {
		port: 3000,
		host: "localhost"
	}
}

module.exports = new ConfigFile();