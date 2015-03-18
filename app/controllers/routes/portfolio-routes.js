function PortfolioRoute(router){

	router.get("/", function(req, res){
		// Return All Portfolio Entries
	})

	router.route("/:slug")
		.all(funciton(req, res, next){

		})
		.get(funciton(req, res, next){
			// Return a Portfolio Entry
		})
		.post(funciton(req, res, next){
			// Add a Portfolio Entry
		})
		.delete(funciton(req, res, next){
			// Delete a Portfolio Entry
		})
}

module.exports = function(router){
	return new PortfolioRoute(router);
}