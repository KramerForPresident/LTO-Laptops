module.exports = function(app){
	var laptops = require('./controllers/laptops');

	app.get('/laptops', laptops.findAll);
	app.get('/laptops/:id', laptops.findById);
	app.post('/laptops', laptops.add);
	app.put('/laptops/:id', laptops.update);
	app.delete('/laptops/:id', laptops.delete);
	
}