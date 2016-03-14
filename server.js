//server.js

//call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));

//require('./routes')(app);

//configure app to user bodyParser()
//This will allow us to get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/', function(req, res){

	//res.send('Return JSON or HTML view');
	res.sendFile( __dirname + "/index.html");
	console.log('root endpoint loaded');

});











var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
console.log("http://localhost:" + port);