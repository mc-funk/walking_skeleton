//Call the functionality of express module
var express = require('express');
//instantiate the Router functionality of Express as "router"
var router = express.Router();

//Call the functionality of path module
var path=require('path');

//declare use of Mongoose under variable mongoose
var mongoose = require('mongoose');
//Connect to a database using connect command of mongoose.
//Create database and name it basic_walking_skeleton
mongoose.connect('mongodb://localhost/basic_walking_skeleton');
//Declare a basic model for Cat data
var Cat = mongoose.model('Cat', {name:String});

//create a handler for .post on '/add' route
router.post('/add', function(request, response, next) {
    //Create new Cat with parameter of name = the request's body.name
    //request.body.name is pulled through the AngularJS
    var kitty = new Cat({name: request.body.name});
    //Call .save functionality of Mongoose to send new kitteh to DB
    kitty.save(function(err) {
        if(err) console.log('meow %s', err);
        response.send(kitty.toJSON());
        next();
    });
});

//create a handler for .post on '/get' route
router.get('/cats', function(request, response, next) {
    return Cat.find({}).exec(function(err, cats){
        if(err) throw new Error(err);
        response.send(JSON.stringify(cats));
        next();
    });
});
//Create a handler for the "get" method on the router object
//This will help manage how incoming requests are handled.
//This .get method takes 3 arguments:
//req = request = incoming object
//res = response = outgoing object
//next = has to do with how express handles 'middleware', specific to Express.
//Using "/*" wildcard ensures that any traffic goes to index.
router.get("/*", function(req, res, next) {
    //Declare file, set it to either any parameters coming in on the request,
    //or if there are no parameters in the request, set it equal to the index view.
    var file = req.params[0] || 'views/index.html';
    //Use some "path magic" to ensure our response has the proper path to our index file.
    res.sendFile(path.join(__dirname, '../public', file));
    // Next could augment the response in additional ways later on, but not needed now.
    // next();
});

//Issue an export order to the router to be a module
//This makes the router available throughout the rest of the application
//As a result, router will be how we handle routes for the entire application.
module.exports = router;