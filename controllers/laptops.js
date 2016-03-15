exports.findAll = function(req, res){
	console.log("Executing findAll...");
	console.log("Asset Tag: " + req.query.a);
	console.log("Name: " + req.query.n);

};
exports.findById = function(req, res){
	var id = req.params.id;
	console.log("Executing findById...");
	console.log("Page id is: " + id);

};


exports.add = function(){};
exports.update = function(){};
exports.delete = function(){};
