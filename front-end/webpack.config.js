/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
		new Dotenv({
			systemvars: true,}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'build'),
		},
		port: 3000,
		historyApiFallback: true,
	},
	module: {
		// exclude node_modules
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			
			{ test: /\.(png|jp(e*)g|svg|gif)$/, use: ['file-loader'] },
		],

	},
	// pass all js files through Babel
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.png', '.jpg', '.jpeg', '.gif'],
	}
	
};