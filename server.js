// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 5000;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const server = app.listen(port, function(){
	console.log(`the server is running on port ${port}`);
});

app.get("/getData", function(req,res){
	res.send(projectData);
});

app.post("/postData", function(req,res){
	projectData.temp = req.body.temp;
	projectData.data = req.body.date;
	projectData.content = req.body.content;
	res.send();
});