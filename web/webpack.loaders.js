var path = require('path');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bourbonPaths = require('bourbon').includePaths.map(function(bourbonPath) {
	return 'includePaths[]=' + bourbonPath;
}).join('&');

var version = require('./config/config').VERSION;

module.exports = function(options){
	return {
		preLoaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		],
		loaders: [
			// Our Javascript (bundle into one)
			{
				test: /\.js$/,
				loaders: ['react-hot', 'babel'],
				include: [
					path.join(__dirname, 'src')
				]
			},
			// Hosted Javascript (emit each file so it can be packaged and uploaded)
			{
				test: /\.js$/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/scripts/[name].[ext]',
				include: [
					path.join(__dirname, 'assets', 'scripts')
				]
			},
			// Sass
			{
				test: /index.scss/,
				loader: options.cssLoaders.extractCSSMain.extract('style-loader', 'css-loader!sass-loader?' + bourbonPaths)
			},			
			// Fonts
			{
				test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/fonts/[name].[ext]'
			},
			// Images
			{
				test: /\.(jpe?g|png|gif|svg|ico)/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/images/[name].[ext]'
			},
			// PDFs
			{
				test: /\.(pdf)/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/pdf/[name].[ext]'
			}
		]
	};
};
