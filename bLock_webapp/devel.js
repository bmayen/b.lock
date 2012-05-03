require('./server.js').listen(8666, null, function() {
	console.log('----STARTED----');
	console.log('Nodemon will not honor the app port from the settings');
	console.log('The application is running under http://localhost:8666/');
});