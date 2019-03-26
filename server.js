const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const model = require('./api/models/login.js');
const db = require('./api/db');

let app;

db.connect().then(() => {
	console.log('here');
	app = express();
	app.set('port', process.env.PORT || 3000);
	app.use(bodyParser.json());
	app.use(cors());
	app.use(cookieParser());
	// app.use('/assets', express.static(__dirname + '/assets'));
	// app.use('/src/img', express.static(__dirname + '/src/img'));
	app.post('/api/signup', model.signup);
	app.post('/api/login', model.login);
	app.listen(app.get('port'), () => {
		console.log('Listening on localhost:' + app.get('port') + '...');
	});
	// console.log("listening nice", http_IP, app.get('port'));

}).catch(err => {
	console.log(err, 'cant connect to DB');
});