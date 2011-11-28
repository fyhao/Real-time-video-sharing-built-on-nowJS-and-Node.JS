// include utility library
var util = require('./util.js');

// include ExpressJS framework
var express = require('express');

// create a server from the express
var app = express.createServer(express.logger());

// serve static content in /static directory
app.use("/static", express.static(__dirname + "/static"));

// handle main page, the client page
app.get("/", function(req, res) {
	res.contentType("text/html");
	res.send(util.template('index'));
});

// handle host page, the page to do the main control
app.get("/host", function(req, res) {
	res.contentType("text/html");
	res.send(util.template('host'));
});

// make this process listen to port 80 or 8080
app.listen(process.env.PORT || 8080);

// include nowJS framework handler
var nowjs = require('now');

// initialize nowJS into everyone object
var everyone = nowjs.initialize(app);

// to create a unique key for each registered session name
var key = 0;

// to store each registered session name
var names = [];

// trigger when each client user connect to nowjs
nowjs.on('connect', function() {
	
	// for each client user, check if there has already associated name
	if(!this.now.name) {
		// generate a name for this new client user
		this.now.name = 'name' + ++key;
		
		// add this name into the global names object
		names.push(this.now.name);
	}
	
});

// trigger when each client user disconnect from nowjs
nowjs.on('disconnect', function() {
	// delete this client user name from the global names object
	util.deleteItem(names, this.now.name);
});

// called from client - just execute one client context (host)
everyone.now.shareImage = function(data) {
	// update the data to the other clients other than host
	everyone.now.filterUpdate(this.now.name, data);
};

// called from server - execute every client context, then we can do filtering
everyone.now.filterUpdate = function(name, data) {
	
	// by right, it will execute in every client context include host page, we need to filter out the host by delete its name
	
	if(this.now.name == name) return;
	
	// ok, now we call the client side update image method, to update the screen into HTML5 canvas
	everyone.now.updateImage(data);
};

