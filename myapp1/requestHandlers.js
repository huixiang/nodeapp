var exec = require("child_process").exec;
function start() {
	console.log("request handler start was called.");
	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds) ;
	}
//	sleep(10000);
//	return "Hello Start";
	var content = "empty";
	exec("ls -lah",function(error,stdout,stderr) {
		content = stdout;
	});
	//sleep(1000);
	return content;
}

function upload() {
	console.log("request handler upload was called.");
	return "Hello upload";
}

exports.start = start;
exports.upload = upload;

