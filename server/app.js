//server/app.js controls the flow of data on the server side.
//summon functionality of 'express'
var express = require('express');
//instantiate Express functionality as "app"
var app = express();

//Get body parser up in here!
var bodyParser = require('body-parser');

//Summon functionality in /routes/index.js
//Note dot navigation in path to index.
var index = require('./routes/index');
//Ensure that requests at the root path will be handled by the index variable we created


//Including the following block of text after setting index.js as the handler for root requests
//throws an error: Error: Can't set headers after they are sent.
/*
//Create handler for npm 'get' requests to the home 'route'
//req = request = incoming object
//res = response = outgoing object
app.get("/", function(req, res) {
    //res.send in this case will print to the browser window.
    res.send("Hello!");
});*/

//Set up server, using the listen method
//Listen mode takes two arguments: port and callback function
var server = app.listen(3000, function() {
    //Set port variable equal to the global server variable's address method,
    // which has a port property.
    var port = server.address().port;
    console.log("Listening on port: ", port);
});

//"Allow use of BodyParser and tightens up a few last things for use of the code throughout
//the rest of the application""
app.use(bodyParser.json());
app.use("/", index);

module.exports=app;

