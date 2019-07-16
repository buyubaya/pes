var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//var PurifyCSSWebpackPlugin = require("purifycss-webpack-plugin");
var HtmlCustomHashWebpackPlugin = require('html-custom-hash-webpack-plugin');

var version = require('./config/config').VERSION;

module.exports = function(options) {
	const plugins = [
		new CaseSensitivePathsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(options.environment)
			},
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		options.cssLoaders.extractCSSMain
	];

	const filesToCopy = [
		// {
		// 	from: 'assets/scripts',
		// 	to: 'assets/' + version + '/scripts'
		// },
		// {
		// 	from: 'assets/stylesheets',
		// 	to: 'assets/' + version + '/stylesheets'
		// },
		// {
		// 	from: 'assets/css',
		// 	to: 'assets/' + version + '/stylesheets'
		// },
		// {
		// 	from: 'assets/images',
		// 	to: 'assets/' + version + '/images'
		// },
		{
			from: 'resources',
			to: 'resources'
		}
	];

	const filesToCopyDev = [
		{
			from: 'config/dev',
			to: 'config'
		}
	];

	const filesToCopyProd = [
		{
			from: 'config/prod',
			to: 'config'
		}
	];	

	switch (options.environment) {
		case 'development':
			plugins.push(new webpack.HotModuleReplacementPlugin());	
			plugins.push(new CopyWebpackPlugin(filesToCopyDev));
			break;
		case 'production':
			plugins.push(new webpack.optimize.DedupePlugin());
			plugins.push(
				new webpack.optimize.UglifyJsPlugin({
					compressor: {
						warnings: false,
						screw_ie8: true
					},
					output: {
						comments: false
					}
				})
			);
			plugins.push(new CopyWebpackPlugin(filesToCopyProd));
			break;
	}

	plugins.push(
		new HtmlWebpackPlugin({
			title: 'Plan Enquiry',
			filename: 'index.html',
			template: 'index.template.html.ejs',
			//favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico'),
			isProduction: options.environment == 'production',
			styles: [
				//{ 
					//href: '/assets/' + version + '/stylesheets/' + 'main.css'
				//}
			]
		}),
		new HtmlCustomHashWebpackPlugin({
			hash: version
		})
	);

	plugins.push(new CopyWebpackPlugin(filesToCopy));

	return {plugins};
}
