var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config/config');
var version = config.VERSION;

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
		environment: 'development',
		devtools: true,
		cssLoaders: {
			extractCSSMain
		}
	}
);

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'eventsource-polyfill',
		'webpack-hot-middleware/client',
		'./src/index'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'app.js'
	},
	devServer: {
		contentBase: './src'
	},
	plugins: plugins.plugins,
	// module: {
	// 	preLoaders: loaders.preLoaders,
	// 	loaders: loaders.loaders
	// },	
	module: {
		preLoaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		],
		loaders: [
			{ 
				test: /\.js$/, include: path.join(__dirname, 'src'), 
				loaders: ['babel'] },
			{ 
				test: /(\.css)$/, 
				loaders: ['style', 'css'] 
			},
			// Hosted Javascript (emit each file so it can be packaged and uploaded)
			{
				test: /\.js$/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/scripts/[name].[ext]',
				include: [
					path.join(__dirname, 'assets', 'scripts')
				]
			},
			// SCSS
			{
				test: /\.scss/, 
				loader: 'style!css!sass?includePaths[]=' + (path.resolve(__dirname, './node_modules'))
			},
			// Images
			{
				test: /\.(jpe?g|png|gif|svg|ico)/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/images/[name].[ext]'
			},
			// Fonts
			{
				test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/fonts/[name].[ext]'
			},
			// PDFs
			{
				test: /\.(pdf)/,
				loader: 'url-loader?limit=1&name=assets/' + version + '/pdf/[name].[ext]'
			}
			//   {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			//   {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
			//   {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
			//   {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
		]
	}
};
