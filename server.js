const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const model = require('./api/models/login.js');
const db = require('./api/db');
// var http_IP='192.168.1.79';
const http_IP = process.env.IP || '127.0.0.1';

let app;
db.connect((err) => {
	if (err) {
		console.log('unable to connect to mongo', err);
	} else {
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
	}
});