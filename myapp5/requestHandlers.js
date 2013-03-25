var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
//var exec = require("child_process").exec;

function start(response) {
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
	'<form action="/upload" enctype="multipart/form-data" method="post">'+ 
//	'<textarea name="text" rows="20" cols="60">' + postData + '</textarea>'+ 
	'<input type="file" name="upload">' + 
	'<input type="submit" value="upload text" />'+ 
	'</form>'+ 
	'</body>'+ 
	'</html>'; 	
	response.writeHead(200,{"Content-Type":"text/html"});	
	response.write(body);
	response.end();
}

function upload(response,request) {
	console.log("request handler upload was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request,function(error,fields,files) {
		console.log("parsing done." + files.upload.path);
		fs.renameSync(files.upload.path,"/tmp/test.png");
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("Hello upload:");
		response.write("<img src='/show' />");
		response.end();
	}); 
}

function show(response,postData) {
	console.log("Request handler show was called");
	fs.readFile("/tmp/test.png","binary",function(error,file) {
		if(error) {
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200,{"Content-Type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;

