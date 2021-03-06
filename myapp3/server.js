// examle of export
// you can create index.js code like this:
// var server = require("./server");
// server.start();
//
var http = require('http');
var url = require('url');

function start(route,handle) { 
	function onRequest (req, response) {
		var postData = "";
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		req.setEncoding("utf8");
		req.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received Post data chunk '" + postDataChunk + "'.");
		});

		req.addListener("end", function() {
			route(handle, pathname,response,postData);
		});

	}
	http.createServer(onRequest).listen(1337, "127.0.0.1"); 
	console.log('Server running at http://10.xx.xx.xx:1337/'); 
}

exports.start = start;
