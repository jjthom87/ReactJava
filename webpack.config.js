var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
		'./src/main/react/js/main.jsx'
    ],
    devtool: 'sourcemaps',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
	resolve: {
		root: __dirname,
		extensions: ['', '.js', '.jsx'],
		alias: {
			app: 'src/main/react/js/main.jsx',
		}
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, './node_modules/foundation-sites/scss')
		]
	}
};