var path = require('path');
var http = require('http');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var _ = require('lodash');

var app = express();
var server = http.createServer(app);
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/config/*', function (req, res) {
	console.log(path.join(__dirname, req.url));
	res.type('application/json');
	res.sendFile(path.join(__dirname, 'dist', req.url));
});

app.get('*', function(req, res) {
	res.sendFile(path.resolve( __dirname, './dist/index.html'));
});

server.listen(3000, '0.0.0.0', function (err) {
	if (err) {
		console.error(err);
		return;
	}
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
