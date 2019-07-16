const fs = require('fs')

var jsonServer = require('json-server')

var server = jsonServer.create();
var router = jsonServer.router('api.json');
var middlewares = jsonServer.defaults();

var routes = JSON.parse(fs.readFileSync('routes.json'));
var rewriter = jsonServer.rewriter(routes);

server.use(middlewares);
server.use(rewriter);

server.use(jsonServer.bodyParser)
server.use(function (req, res, next) {
	if (req.method === 'POST' || req.method === 'PUT') {
		req.method = 'GET';
	}
	next();
})
// change the endpoint below to simulate an Internal Server Error (500) 
server.use('/failed', function (req, res, next) {
	res.sendStatus(500);
})

server.use('/api/doc/v1/showpdf/*', function (req, res, next) {	
	var file = 'assets/Statement_M-528472.pdf';
  	res.download(file);
})
// server.use('/api/profile/v1/account', function (req, res, next) {
// 	if (req.method === 'GET') {
// 		req.method === 'PUT';
// 		res.status(500).send("Wow, I catched you.");
// 	}	
// })

server.use(router);
server.listen(3001, function () {
	console.log('JSON Server is running on port 3001');
})
