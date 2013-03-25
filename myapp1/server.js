// examle of export
// you can create index.js code like this:
// var server = require("./server");
// server.start();
//
var http = require('http');
var url = require('url');

function start(route,handle) { 
	function onRequest (req, res) {
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");
		var content = route(handle,pathname);	
	
		res.writeHead(200, {'Content-Type': 'text/plain'}); 
		res.write(content);
		res.end();
//		res.end('Hello World\n'); 
	}
	http.createServer(onRequest).listen(1337, "127.0.0.1"); 
	console.log('Server running at http://127.0.0.1:1337/'); 
}

exports.start = start;
