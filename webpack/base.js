const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                    }, // babel-loader environment file defined in .babelrc
                },
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader',
            }, //Vertex and Fragment shaders
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/i,
                use: 'file-loader',
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ?
                        MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ], // if production, use MiniCssExtractPlugin to separate css file into its own
                // advantage to load css beforehand
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
        }), //handle renderer swapping in our app
        new HtmlWebpackPlugin({
            template: './index.html',
        }), // HTML template
    ],
}