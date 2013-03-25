var querystring = require("querystring");
var exec = require("child_process").exec;

function start(response,postData) {
	console.log("request handler start was called.");
	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds) ;
	}
	/*
	exec("find / -name 'abc.txt'",{timeout:10000,mxBuffer:20000*1024} ,function(error,stdout,stderr) {
		response.writeHead(200,{"Content-Type":"text/plain"});	
		response.write(stdout);
		response.end();
		if(error !== null) {
			console.log("exec error:" + error);
			//console.log("stderr:" + stderr); //is null
		}
	});
	*/
	var body = '<html>'+ 
	'<head>'+ 
	'<meta http-equiv="Content-Type" content="text/html; '+	 'charset=UTF-8" />'+ 
	'</head>'+ 
	'<body>'+ 
	'<form action="/upload" method="post">'+ 
	'<textarea name="text" rows="20" cols="60">' + postData + '</textarea>'+ 
	'<input type="submit" value="Submit text" />'+ 
	'</form>'+ 
	'</body>'+ 
	'</html>'; 	
	response.writeHead(200,{"Content-Type":"text/html"});	
	response.write(body);
	response.end();
}

function upload(response,postData) {
	console.log("request handler upload was called.");
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hello upload");
	//response.write("you've sent:" + postData);
	data = querystring.parse(postData);
	console.log(data);
	response.write("you've sent:" + data.text);
	response.end();
}

exports.start = start;
exports.upload = upload;

