function route(handle,pathname) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		return handle[pathname]();
	} else {
		console.log("Warning! No request hanlder for " + pathname);
		return "404 Not found.";
	}
}

exports.route = route;
