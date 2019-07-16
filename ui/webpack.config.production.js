// var path = require('path');
// var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
var config = require('./config/config');

// CSS loaders
var extractCSSMain = new ExtractTextPlugin('assets/' + config.VERSION + '/stylesheets/styles.css');

// Common loaders
var loaders = require('./webpack.loaders')(
	{
		cssLoaders: {
			extractCSSMain
		}
	}
);

// Common plugins
var plugins = require('./webpack.plugins')(
	{
		environment: 'production',
		devtools: false,
		cssLoaders: {
			extractCSSMain
		}
	}
);

module.exports = {
	entry: './src/index',
	output: {
		path: __dirname + '/dist', 
		publicPath: '/',
		filename: 'assets/' + config.VERSION  + '/scripts/app.js'
	},
	plugins: plugins.plugins,
	module: {
		preLoaders: loaders.preLoaders,
		loaders: loaders.loaders
	}
};
