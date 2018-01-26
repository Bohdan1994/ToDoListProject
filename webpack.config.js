var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});

module.exports = {
  entry: "./src/js/main.js", 
  output: {
  	path: path.resolve(__dirname, 'dist'),
  	filename: 'bundle.js',
  	publicPath: '/dist'
  },
  module: {
  	rules :[
  	{
  		test: /\.js$/,
  		exclude: /(node_modules|bower_components)/,
  		use: [{
  			loader: 'babel-loader',
  			options: {
  				presets: ['es2015'],
  			}
  		}]
  	},
  	{
  		test: /\.scss$/,
  		use: extractPlugin.extract({
  			use: ['css-loader', 'sass-loader']
  		})
  	}
  	]

  },
  plugins: [
  		extractPlugin
  	 ]
}; 