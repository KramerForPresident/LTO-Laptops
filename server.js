//server.js


//call the packages we need
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root', //PASSWORD IS ROOT FOR EXAMPLE PURPOSES ON LOCAL MACHINE. DON'T ACTUALLY USE THIS
	database: 'schoolboard'
});


//_________Function Definitions______________
function findAll(req, res){
	console.log("Executing findAll...");
	connection.query("SELECT * FROM laptops", function(err, rows, fields){
		if(!err){
			for(var i = 0; i < rows.length; i++){
			//	console.log(rows[i].asset + " " + rows[i].name);
			}
			res.send(rows);
		}
		else{
			console.log("There was an error performing query");
		}
	});
	
}

function findById(req, res){
	console.log("Executing findById...");

	var id = req.params.id;
	var queryString = "SELECT * FROM laptops WHERE id =" + id + ";";
	
	connection.query(queryString, function(err, rows, fields){
		if(!err){
			res.send(rows);
		}else{
			console.log("Error " + err);
		}
	
	});
	
	
	var message = ("Located id number " + id);
//	console.log("Page id is: " + id);

}


function add(req, res){
	var inputA = req.body.a;
	var inputN = req.body.n;
	console.log("Executing add...");
	console.log("Asset Tag: " + inputA);
	console.log("Name: " + inputN);
	
	var queryString = "INSERT INTO laptops (asset, name) VALUES('" + inputA + "', '" + inputN + "');"
	//console.log(queryString);
	
	
	connection.query(queryString, function(err, rows, fields){
		if(!err){
			for(var i = 0; i < rows.length; i++){
				console.log(rows[i].asset + " " + rows[i].name);
			}
		}
		else{
			console.log("Error: " + err);
		}
	});
	
	
	res.send("Complete");
}

function update(req, res){
	var id = req.params.id;
	var name = req.body.i;



	console.log("Executing update..");
	console.log(id + " " + name);
	
	var queryString = "UPDATE laptops SET lto='" + name + "' WHERE id = " + id + ";"
	
	//console.log(queryString);
	
	connection.query(queryString, function(err, rows, fields){
		if(!err){
			console.log("added lto!");
		}
		else{
			console.log("Error: " + err);
		}
	});
	
	res.send("SUCCESSO");
	
}



function deleteById(){
	


}







connection.connect(function(err){
	if(!err){
		console.log("Success! Connecting to db...");
	}else{
		console.log("Error: " + err);
	}
});



//route the html content
app.use(express.static('public'));

//configure app to user bodyParser()
//This will allow us to get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//routes with their callback functions
app.get('/laptops', findAll);
app.get('/laptops/:id', findById);
app.post('/laptops', add);
app.put('/laptops/:id', update);
app.delete('/laptops/:id', deleteById);



var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
console.log("http://localhost:" + port);